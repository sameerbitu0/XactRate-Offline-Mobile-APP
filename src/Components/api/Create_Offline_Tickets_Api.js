import URL_CONFIG from '../global-config';
import Create_Offline_Invoice_Api from './Create_Offline_Invoice_Api';
import {GetAllDataFunction} from './GetAllDataFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Create_Offline_Tickets_Api = async userToken => {
  try {
    // Check internet connectivity
    const isConnected = await checkInternetConnectivity();
    const data = await GetAllDataFunction('Local_schedule_ticket');
    const createTicketsData = data.filter(item => item.status == 1);
    const filteredTickets = data.filter(item => item.status !== '1');
    if (isConnected) {
      if (createTicketsData.length > 0) {
        const response = await fetch(
          `${URL_CONFIG.Url}${URL_CONFIG.tickets_bulk_save_api}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(createTicketsData),
          },
        );      
        const responseData = await response.json();
        if (responseData.message == 'Bulk tickets stored successfully') {
          InsertDataFunction('Local_schedule_ticket', filteredTickets);
          Create_Offline_Invoice_Api(userToken);
        }
        return responseData;
      }
    } else {
      const errorMessage =
        'No internet connection. Data will not be sent to the server.';
      return errorMessage;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default Create_Offline_Tickets_Api;
