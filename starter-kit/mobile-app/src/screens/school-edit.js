import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import { update, remove, userID } from '../lib/school-utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 22,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeArea: {
    width: '40%'
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25
  },
  quantityArea: {
    width: '40%'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 14,
    elevation: 2,
    marginBottom: 25
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25
  },
  updateButton: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15
  },
  deleteButton: {
    backgroundColor: '#da1e28',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15
  }
});

const EditResource = (props) => {
  const clearItem = { userID: userID(), e: 'Travel', name: '', rollno: '', school: '', district: '', state: '', country: '', location: '', contact: '', scholarshipamount: '1' }
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(false);
  const [position, setPosition] = React.useState({})

  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const item = props.route.params.item;
      setItem({
        ...item,
        scholarshipamount: item.scholarshipamount.toString()
      });

      Geolocation.getCurrentPosition((pos) => {
        setPosition(pos);
      });
    })
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`
      })
    }
    setUseLocation(!useLocation);
  };

  const updateItem = () => {
    const payload = {
      ...item,
      scholarshipamount: isNaN(item.scholarshipamount) ? 1 : parseInt(item.scholarshipamount),
      id: item.id || item['_id']
    };

    update(payload)
      .then(() => {
        Alert.alert('Done', 'The scholarship amount has been sent to ' + item.name + '.!', [{ text: 'OK' }]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{ text: 'OK' }]);
      });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this details?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteItem() }
      ]
    )
  }

  const deleteItem = () => {
    const payload = {
      ...item,
      id: item.id || item['_id']
    };

    remove(payload)
      .then(() => {
        Alert.alert('Done', 'Your details has been deleted.', [{ text: 'OK' }]);
        props.navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', err.message, [{ text: 'OK' }]);
      });
  };

  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.typeArea}>
          <Text style={styles.label}>Type</Text>
          <PickerSelect
            style={{ inputIOS: styles.selector }}
            value={item.type}
            onValueChange={(t) => setItem({ ...item, type: t })}
            items={[
              { label: 'School', value: 'School' },
            ]}
          />
        </View>
        <View style={styles.quantityArea}>
          <Text style={styles.label}>Scholarship amount</Text>
          <TextInput
            style={styles.textInput}
            value={item.scholarshipamount}
            onChangeText={(t) => setItem({ ...item, scholarshipamount: t })}
            onSubmitEditing={updateItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='e.g., 1000'
            keyboardType='numeric'
          />
        </View>
      </View>

      <Text style={styles.label}>{item.name}</Text>
      <Text style={styles.label}>{item.rollno}</Text>
      <Text style={styles.label}>{item.school}</Text>
      <Text style={styles.label}>{item.district}</Text>
      <Text style={styles.label}>{item.state}</Text>
      <Text style={styles.label}>{item.country}</Text>

      {/* <Text style={styles.label}>District</Text>
      <TextInput
        style={styles.textInput}
        value={item.district}
        onChangeText={(t) => setItem({ ...item, district: t })}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Tomotatoes'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.textInput}
        value={item.state}
        onChangeText={(t) => setItem({ ...item, state: t })}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Tomotatoes'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.textInput}
        value={item.country}
        onChangeText={(t) => setItem({ ...item, country: t })}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Tomotatoes'
        blurOnSubmit={false}
      />

      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({ ...item, contact: t })}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='user@domain.com'
      />
      <Text style={styles.label}>Location</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleUseLocation}>
          {
            (useLocation)
              ?
              <CheckedIcon height='18' width='18' />
              :
              <UncheckedIcon height='18' width='18' />
          }
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}> Use my current location </Text>
      </View>
      <TextInput
        style={useLocation ? styles.textInputDisabled : styles.textInput}
        value={item.location}
        onChangeText={(t) => setItem({ ...item, location: t })}
        onSubmitEditing={updateItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='street address, city, state'
      /> */}

      {
        item.type !== '' &&
        item.district.trim() !== '' &&
        item.state.trim() !== '' &&
        item.country.trim() !== '' &&
        item.contact.trim() !== '' &&
        <TouchableOpacity onPress={updateItem}>
          <Text style={styles.updateButton}>Pay scholarship</Text>
        </TouchableOpacity>
      }

      {/* <TouchableOpacity onPress={confirmDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default EditResource;
