import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import STRING_CONSTANTS from '../../../strings/strings';
import NAVIGATION_STRING_CONSTANTS from '../../../navigation/NavigarionStringConstants';

const ClientsContainer = ({clients}) => {
  const navigation = useNavigation();
  const clientsData = clients ? clients.data : clients;

  return (
    <View>
      <View style={styles.viewAllClientContainer}>
        <Text style={styles.clientTitleText}>
          {STRING_CONSTANTS.recent_clients}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Root', {
              screen: NAVIGATION_STRING_CONSTANTS.clients_screen,
            })
          }>
          <Text style={styles.viewTitleText}>View all</Text>
        </TouchableOpacity>
      </View>
      {clients ? (
        clientsData.length > 0 ? (
          <>
            {clientsData.map((client, index) => (
              <TouchableOpacity
                key={index}
                style={styles.clientBoxContainer}
                onPress={() =>
                  navigation.navigate(
                    NAVIGATION_STRING_CONSTANTS.client_tickets_screen,
                    {
                      ClientId: client.id,
                      ClientFName: client.fname,
                      ClientLName: client.lname,
                      ClientEmail: client.email,
                      ClientMobile: client.phone_no_1,
                    },
                  )
                }>
                <Text style={styles.clientNameText}>
                  {client.fname} {client.lname}
                </Text>
                <Text style={styles.clientDetailText}>{client.email}</Text>
                <Text style={styles.clientDetailText}>
                  {'+'}
                  {client.phone_no_1}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.noClientsContainer}>
            <Text style={styles.noClientsText}>No clients available</Text>
          </View>
        )
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5dbf06" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewAllClientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#B2B9BF',
    paddingVertical: 15,
  },
  clientTitleText: {
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontSize: 17,
  },
  viewTitleText: {
    color: '#478113',
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    borderBottomWidth: 0.8,
    borderColor: '#5DBF06',
  },
  clientBoxContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B2B9BF',
    borderWidth: 0.8,
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
  },
  clientNameText: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    marginVertical: 2,
  },
  clientDetailText: {
    color: '#808080',
    fontFamily: 'DMSans-Bold',
    fontSize: 13,
    marginVertical: 2,
  },
  noClientsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noClientsText: {
    color: '#000',
    fontSize: 15,
    padding: 10,
    fontFamily: 'DMSans-Medium',
  },
  loadingContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClientsContainer;
