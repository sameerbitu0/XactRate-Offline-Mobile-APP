import {GetAllDataFunction} from './GetAllDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL_CONFIG from '../global-config';
import {InsertDataFunction} from './StoreDataFunction';

const scheduleTicketsApi = async (scheduleTickets, invoiceTickets) => {
  const data = await GetAllDataFunction('Local_schedule_ticket');
  var scheduleTickets = data.filter(function (item) {
    return item.status === '1';
  });
  var invoiceTickets = data.filter(function (item) {
    return item.status !== '1';
  });
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(
      `${URL_CONFIG.Url}${URL_CONFIG.bulk_ticket_invoice_store_api}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          tickets: scheduleTickets,
          invoices: invoiceTickets,
        }),
      },
    );
    const responseData = await response.json();
    if (responseData.message == 'Bulk tickets stored successfully') {
      var nullData = [];
      InsertDataFunction('Local_schedule_ticket', nullData);
    }
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const hitAPIBasedOnStatusAndConnection = async () => {
  try {
    const isConnected = await checkInternetConnectivity();
    const data = await GetAllDataFunction('Local_schedule_ticket');
    if (isConnected) {
      if (data.length > 0) {
        var responseData = await scheduleTicketsApi();
        return responseData;
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

export default hitAPIBasedOnStatusAndConnection;
