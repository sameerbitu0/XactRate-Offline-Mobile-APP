import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NAVIGATION_STRING_CONSTANTS from '../../../navigation/NavigarionStringConstants';

const ClientsItem = ({item}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(NAVIGATION_STRING_CONSTANTS.client_tickets_screen, {
      ClientId: item.id,
      ClientFName: item.fname,
      ClientLName: item.lname,
      ClientEmail: item.email,
      ClientMobile: item.phone_no_1,
    });
  };

  return (
    <TouchableOpacity style={styles.BoxContainer} onPress={handlePress}>
      <View style={styles.BoxDataContainer}>
        <View style={styles.BoxData}>
          <Text style={styles.BoxDataClientNameText}>
            {item.fname} {item.lname}
          </Text>
          <Text style={styles.BoxDataClientDetailText}>{item.email}</Text>
          <Text style={styles.BoxDataClientDetailText}>+{item.phone_no_1}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={styles.ViewIcon}
            source={require('../../../assets/ViewIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ClientsItem;

const styles = StyleSheet.create({
  BoxDataClientDetailText: {
    color: '#808080',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    margin: 2,
  },
  BoxContainer: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 15,
  },
  BoxData: {
    flexDirection: 'column',
  },
  BoxDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ViewIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  BoxDataClientNameText: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    margin: 2,
  },
});
