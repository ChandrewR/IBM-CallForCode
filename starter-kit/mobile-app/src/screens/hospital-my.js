import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {search, hospitalID} from '../lib/hospital-utils';

const styles = StyleSheet.create({
  flatListView: {
    backgroundColor: '#FFF',
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
  emptyListView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#999999',
    fontSize: 16,
  },
});

const MyHospitals = function({navigation}) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      search({hospitalID: hospitalID()})
        .then(setItems)
        .catch(err => {
          console.log(err);
          Alert.alert(
            'ERROR',
            'Please try again. If the problem persists contact an administrator.',
            [{text: 'OK'}],
          );
        });
    });
  }, []);

  const Item = props => {
    return (
      <TouchableOpacity
        style={styles.itemTouchable}
        onPress={() => {
          navigation.navigate('Edit Hospital', {item: props});
        }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.availability} ) </Text>
        </View>
        <Text style={styles.itemDescription}>
          {props.description +
            ',' +
            props.district +
            ',' +
            props.state +
            ',' +
            props.country}
        </Text>
      </TouchableOpacity>
    );
  };

  if (items.length > 0) {
    return (
      <FlatList
        style={styles.flatListView}
        data={items}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      />
    );
  } else {
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyListText}>No hospitals added</Text>
      </View>
    );
  }
};

export default MyHospitals;
