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

const TicketsContainer = ({tickets}) => {
  const navigation = useNavigation();
  const clientsData = tickets ? tickets.data : tickets;

  function InvoiceNavigation(ticket) {
    navigation.navigate(NAVIGATION_STRING_CONSTANTS.ticket_screen, {
      ClientId: ticket.client_id,
      TicketId: ticket.id,
      ClientFName: ticket.first_name,
      ClientLName: ticket.last_name,
      ClientEmail: ticket.email,
      ClientMobile: ticket.phone_no_1,
      TicketDescription: ticket.ticket_type_description,
      TicketTypeId: ticket.ticket_type_id,
      Status: ticket.status,
    });
  }

  return (
    <View>
      <View style={styles.viewAllClientContainer}>
        <Text style={styles.clientTitleText}>
          {STRING_CONSTANTS.recent_tickets}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Root', {
              screen: NAVIGATION_STRING_CONSTANTS.details_screen,
            })
          }>
          <Text style={styles.viewTitleText}>View all</Text>
        </TouchableOpacity>
      </View>
      {tickets ? (
        clientsData.length > 0 ? (
          <>
            {clientsData.map((ticket, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => InvoiceNavigation(ticket)}
                  style={styles.ClientBoxContainer}>
                  <Text style={styles.ClientNameText}>
                    {ticket.first_name} {ticket.last_name}
                  </Text>
                  <Text style={styles.ClientDetailText}>
                    {ticket.ticket_type_description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.ClientDetailText}>{ticket.date}</Text>
                    <View style={styles.ScheduleStatusView}>
                      {ticket.status == 1 && (
                        <Text style={styles.ScheduleText}>
                          {STRING_CONSTANTS.schedule}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.noClientsContainer}>
            <Text style={styles.noClientsText}>No Tickets available</Text>
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
  ClientBoxContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#B2B9BF',
    borderWidth: 0.8,
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
  },
  ClientNameText: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    margin: 2,
  },
  ClientDetailText: {
    color: '#808080',
    fontFamily: 'DMSans-Bold',
    fontSize: 13,
    margin: 2,
  },
  ScheduleStatusView: {
    backgroundColor: '#5DBF06',
    paddingHorizontal: 18,
    textAlign: 'center',
    paddingVertical: 2,
    borderRadius: 15,
    width: 140,
  },
  ScheduleText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
});

export default TicketsContainer;
