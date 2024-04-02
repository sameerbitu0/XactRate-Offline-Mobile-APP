import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import STRING_CONSTANTS from '../../../strings/strings';

export default function DashboardBox({
  openTicket,
  closeTicket,
  scheduleTicket,
}) {
  return (
    <View style={styles.MainContainer}>
      <TouchableOpacity style={styles.BoxContainer}>
        {openTicket !== null && openTicket !== undefined ? (
          <Text style={styles.DataNameText}>{openTicket}</Text>
        ) : (
          <ActivityIndicator size="small" color="#5dbf06" />
        )}
        <Text style={styles.DataText}>{STRING_CONSTANTS.open_ticket}</Text>
        <Text style={styles.DataTextSecond}>{STRING_CONSTANTS.tickets}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.BoxContainer}>
        {closeTicket !== null && closeTicket !== undefined ? (
          <Text style={styles.DataNameText}>{closeTicket}</Text>
        ) : (
          <ActivityIndicator size="small" color="#5dbf06" />
        )}
        <Text style={styles.DataText}>{STRING_CONSTANTS.close_ticket}</Text>
        <Text style={styles.DataTextSecond}>{STRING_CONSTANTS.tickets}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.BoxContainer}>
        {scheduleTicket !== null && scheduleTicket !== undefined ? (
          <Text style={styles.DataNameText}>{scheduleTicket}</Text>
        ) : (
          <ActivityIndicator size="small" color="#5dbf06" />
        )}
        <Text style={styles.DataText}>{STRING_CONSTANTS.up_coming_ticket}</Text>
        <Text style={styles.DataTextSecond}>{STRING_CONSTANTS.tickets}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  BoxContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B2B9BF',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  DataText: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 13,
    marginTop: 5,
  },
  DataTextSecond: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 13,
  },
  DataNameText: {
    color: '#000000',
    fontFamily: 'DMSans-Medium',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
  },
});
