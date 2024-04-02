import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NAVIGATION_STRING_CONSTANTS from '../../../navigation/NavigarionStringConstants';
import STRING_CONSTANTS from '../../../strings/strings';
const TicketItem = ({item,Param}) => {
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
    <TouchableOpacity
      onPress={() => Param(item)}
      style={styles.ClientBoxContainer}>
      <Text style={styles.ClientNameText}>
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.ClientDetailText}>
        {item.ticket_type_description}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.ClientDetailText}>{item.date}</Text>

        {item.status == 1 && (
          <View
            style={{
              backgroundColor: '#5DBF06',
              paddingHorizontal: 18,
              textAlign: 'center',
              paddingVertical: 2,
              borderRadius: 15,
              width: 140,
            }}>
            <Text style={styles.StatusText}>{STRING_CONSTANTS.schedule}</Text>
          </View>
        )}
        {item.status == 2 && (
          <View
            style={{
              backgroundColor: '#f1b53d',
              paddingHorizontal: 18,
              textAlign: 'center',
              paddingVertical: 2,
              borderRadius: 15,
              width: 140,
            }}>
            <Text style={styles.StatusText}>{STRING_CONSTANTS.close}</Text>
          </View>
        )}
        {item.status == 3 && (
          <View
            style={{
              backgroundColor: '#ff5d48',
              paddingHorizontal: 18,
              textAlign: 'center',
              paddingVertical: 2,
              borderRadius: 15,
              width: 140,
            }}>
            <Text style={styles.StatusText}>{STRING_CONSTANTS.decline}</Text>
          </View>
        )}
        {item.status == 4 && (
          <View
            style={{
              backgroundColor: 'rgb(9, 120, 184)',
              paddingHorizontal: 18,
              textAlign: 'center',
              paddingVertical: 2,
              borderRadius: 15,
              width: 140,
            }}>
            <Text style={styles.StatusText}>Locked</Text>
          </View>
        )}

        {item.status == 5 && (
          <View
            style={{
              backgroundColor: '#1bb99a',
              paddingHorizontal: 18,
              textAlign: 'center',
              paddingVertical: 2,
              borderRadius: 15,
              width: 140,
            }}>
            <Text style={styles.StatusText}> {STRING_CONSTANTS.suspend} </Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.ClientDetailText,
          {color: '#333333', fontSize: 11, fontFamily: 'DMSans-BoldItalic'},
        ]}>
        {item.ticket_notes}
      </Text>
    </TouchableOpacity>
  );
};

export default TicketItem;

const styles = StyleSheet.create({
  ClientBoxContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: '#B2B9BF',
    borderWidth: 0.5,
    borderRadius: 3,
    padding: 10,
  },
  ClientNameText: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    margin: 2,
  },
  ClientDetailText: {
    color: '#808080',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    margin: 2,
  },
  StatusText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
});
