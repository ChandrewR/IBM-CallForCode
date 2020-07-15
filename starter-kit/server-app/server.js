require("dotenv").config({ silent: true });

const express = require("express");
const bodyParser = require("body-parser");

const assistant = require("./lib/assistant.js");
const port = process.env.PORT || 3000;

const cloudant = require("./lib/cloudant.js");
const hospitalCloudant = require("./lib/hospital-cloudant.js");

const app = express();
app.use(bodyParser.json());

const testConnections = () => {
  const status = {};
  return assistant
    .session()
    .then(sessionid => {
      status["assistant"] = "ok";
      return status;
    })
    .catch(err => {
      console.error(err);
      status["assistant"] = "failed";
      return status;
    })
    .then(status => {
      return cloudant.info();
    })
    .then(info => {
      status["cloudant"] = "ok";
      return status;
    })
    .catch(err => {
      console.error(err);
      status["cloudant"] = "failed";
      return status;
    });
};

const hospitalTestConnections = () => {
  const status = {};
  return assistant
    .session()
    .then(sessionid => {
      status["assistant"] = "ok";
      return status;
    })
    .catch(err => {
      console.error(err);
      status["assistant"] = "failed";
      return status;
    })
    .then(status => {
      return hospitalCloudant.info();
    })
    .then(info => {
      status["hospitalCloudant"] = "ok";
      return status;
    })
    .catch(err => {
      console.error(err);
      status["hospitalCloudant"] = "failed";
      return status;
    });
};

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
};

app.get("/", async (req, res) => {
  let dbstatus = {};
  //testConnections().then(status => res.json({ status: status }));
  await testConnections().then(status => (dbstatus["resource"] = status));
  await hospitalTestConnections().then(
    status => (dbstatus["hospital"] = status)
  );
  return res.json({ dbstatus: dbstatus });
});

/**
 * Get a session ID
 *
 * Returns a session ID that can be used in subsequent message API calls.
 */
app.get("/api/session", (req, res) => {
  assistant
    .session()
    .then(sessionid => res.send(sessionid))
    .catch(err => handleError(res, err));
});

/**
 * Post process the response from Watson Assistant
 *
 * We want to see if this was a request for resources/supplies, and if so
 * look up in the Cloudant DB whether any of the requested resources are
 * available. If so, we insert a list of the resouces found into the response
 * that will sent back to the client.
 *
 * We also modify the text response to match the above.
 */
function post_process_assistant(result) {
  let resource;
  let type;
  // First we look to see if a) Watson did identify an intent (as opposed to not
  // understanding it at all), and if it did, then b) see if it matched a supplies entity
  // with reasonable confidence. "supplies" is the term our trained Watson skill uses
  // to identify the target of a question about resources, i.e.:
  //
  // "Where can i find face-masks?"
  //
  // ....should return with an enitity == "supplies" and entitty.value = "face-masks"
  //
  // That's our trigger to do a lookup - using the entitty.value as the name of resource
  // to to a datbase lookup.
  if (result.intents.length > 0) {
    result.entities.forEach(item => {
      console.log("Item entity check------>>>>>>>>" + item.entity);
      if (item.entity == "supplies" && item.confidence > 0.3) {
        type = "supplies";
        resource = item.value;
      }

      if (item.entity == "hospital" && item.confidence > 0.3) {
        type = "hospital";
        resource = "hospital";
      }
    });
  }
  if (!resource) {
    return Promise.resolve(result);
  } else {
    // OK, we have a resource...let's look this up in the DB and see if anyone has any.

    if (type === "supplies") {
      return cloudant.find("", resource, "").then(data => {
        let processed_result = result;
        if (data.statusCode == 200 && data.data != "[]") {
          processed_result["resources"] = JSON.parse(data.data);
          processed_result["generic"][0]["text"] =
            "There is" + "\xa0" + resource + " available";
        } else {
          processed_result["generic"][0]["text"] =
            "Sorry, no" + "\xa0" + resource + " available";
        }
        return processed_result;
      });
    }

    if (type === "hospital") {
      return hospitalCloudant.find("", resource, "").then(data => {
        let processed_result = result;
        if (data.statusCode == 200 && data.data != "[]") {
          processed_result["resources"] = JSON.parse(data.data);
          processed_result["generic"][0]["text"] =
            "There is" + "\xa0" + resource + " available";
        } else {
          processed_result["generic"][0]["text"] =
            "Sorry, no" + "\xa0" + resource + " available";
        }
        return processed_result;
      });
    }
  }
}

/**
 * Post a messge to Watson Assistant
 *
 * The body must contain:
 *
 * - Message text
 * - sessionID (previsoulsy obtained by called /api/session)
 */
app.post("/api/message", (req, res) => {
  const text = req.body.text || "";
  const sessionid = req.body.sessionid;
  console.log(req.body);
  assistant
    .message(text, sessionid)
    .then(result => {
      return post_process_assistant(result);
    })
    .then(new_result => {
      res.json(new_result);
    })
    .catch(err => handleError(res, err));
});

/**
 * Get a list of resources
 *
 * The query string may contain the following qualifiers:
 *
 * - type
 * - name
 * - userID
 *
 * A list of resource objects will be returned (which can be an empty list)
 */
app.get("/api/resource", (req, res) => {
  const type = req.query.type;
  const name = req.query.name;
  const userID = req.query.userID;
  cloudant
    .find(type, name, userID)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode);
      } else {
        res.send(data.data);
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Create a new resource
 *
 * The body must contain:
 *
 * - type
 * - name
 * - contact
 * - userID
 *
 * The body may also contain:
 *
 * - description
 * - quantity (which will default to 1 if not included)
 *
 * The ID and rev of the resource will be returned if successful
 */
let types = ["Food", "Other", "Help"];
app.post("/api/resource", (req, res) => {
  if (!req.body.type) {
    return res.status(422).json({ errors: "Type of item must be provided" });
  }
  if (!types.includes(req.body.type)) {
    return res
      .status(422)
      .json({ errors: "Type of item must be one of " + types.toString() });
  }
  if (!req.body.name) {
    return res.status(422).json({ errors: "Name of item must be provided" });
  }
  if (!req.body.contact) {
    return res
      .status(422)
      .json({ errors: "A method of conact must be provided" });
  }
  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.description || "";
  const userID = req.body.userID || "";
  const quantity = req.body.quantity || 1;
  const location = req.body.location || "";
  const contact = req.body.contact;

  cloudant
    .create(type, name, description, quantity, location, contact, userID)
    .then(data => {
      if (data.statusCode != 201) {
        res.sendStatus(data.statusCode);
      } else {
        res.send(data.data);
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Update new resource
 *
 * The body may contain any of the valid attributes, with their new values. Attributes
 * not included will be left unmodified.
 *
 * The new rev of the resource will be returned if successful
 */

app.patch("/api/resource/:id", (req, res) => {
  const type = req.body.type || "";
  const name = req.body.name || "";
  const description = req.body.description || "";
  const userID = req.body.userID || "";
  const quantity = req.body.quantity || "";
  const location = req.body.location || "";
  const contact = req.body.contact || "";

  cloudant
    .update(
      req.params.id,
      type,
      name,
      description,
      quantity,
      location,
      contact,
      userID
    )
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode);
      } else {
        res.send(data.data);
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Delete a resource
 */
app.delete("/api/resource/:id", (req, res) => {
  cloudant
    .deleteById(req.params.id)
    .then(statusCode => res.sendStatus(statusCode))
    .catch(err => handleError(res, err));
});

/**
 * Get a list of resources
 *
 * The query string may contain the following qualifiers:
 *
 * - type
 * - name
 * - userID
 *
 * A list of resource objects will be returned (which can be an empty list)
 */
app.get("/api/hospital", (req, res) => {
  const type = req.query.type;
  const name = req.query.name;
  const id = req.query.id;
  const district = req.query.district;
  const state = req.query.state;
  const country = req.query.country;
  hospitalCloudant
    .find(type, name, id, district, state, country)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode);
      } else {
        res.send(data.data);
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Create a new resource
 *
 * The body must contain:
 *
 * - type
 * - name
 * - contact
 * - userID
 *
 * The body may also contain:
 *
 * - description
 * - quantity (which will default to 1 if not included)
 *
 * The ID and rev of the resource will be returned if successful
 */
let hospitaltypes = ["Hospital"];
app.post("/api/hospital", (req, res) => {
  if (!req.body.type) {
    return res.status(422).json({ errors: "Type of item must be provided" });
  }
  if (!hospitaltypes.includes(req.body.type)) {
    return res.status(422).json({
      errors: "Type of item must be one of " + hospitaltypes.toString()
    });
  }
  if (!req.body.name) {
    return res
      .status(422)
      .json({ errors: "Name of hospital must be provided" });
  }
  if (!req.body.contact) {
    return res
      .status(422)
      .json({ errors: "A method of contact must be provided" });
  }
  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.description || "";
  const availability = req.body.availability || 0;
  const district = req.body.district || "";
  const state = req.body.state || "";
  const country = req.body.country || "";
  const contact = req.body.contact;

  hospitalCloudant
    .create(
      type,
      name,
      description,
      availability,
      district,
      state,
      country,
      contact
    )
    .then(data => {
      if (data.statusCode != 201) {
        res.sendStatus(data.statusCode);
      } else {
        res.send(data.data);
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Update new resource
 *
 * The body may contain any of the valid attributes, with their new values. Attributes
 * not included will be left unmodified.
 *
 * The new rev of the resource will be returned if successful
 */

app.patch("/api/hospital/:id", (req, res) => {
  const type = req.body.type || "";
  const name = req.body.name || "";
  const description = req.body.description || "";
  const availability = req.body.availability || 0;
  const district = req.body.district || "";
  const state = req.body.state || "";
  const country = req.body.country || "";
  const contact = req.body.contact || "";

  hospitalCloudant
    .update(
      req.params.id,
      type,
      name,
      description,
      availability,
      district,
      state,
      country,
      contact
    )
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode);
      } else {
        res.send(data.data);
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Delete a resource
 */
app.delete("/api/hospital/:id", (req, res) => {
  hospitalCloudant
    .deleteById(req.params.id)
    .then(statusCode => res.sendStatus(statusCode))
    .catch(err => handleError(res, err));
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Alpha Covid-19 Server listening at http://${host}:${port}`);
});
