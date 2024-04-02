import URL_CONFIG from '../global-config';
import {GetAllDataFunction} from './GetAllDataFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Create_Offline_Invoice_Api = async userToken => {
  try {
    // Check internet connectivity
    const isConnected = await checkInternetConnectivity();
    const data = await GetAllDataFunction('Local_schedule_ticket');
    const createTicketsData = data.filter(item => item.status == 1);
    const filteredInvoice = data.filter(item => item.status !== '1');
    if (isConnected) {
      if (filteredInvoice.length > 0) {
        const response = await fetch(
          `${URL_CONFIG.Url}${URL_CONFIG.invoices_bulk_save_api}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(filteredInvoice),
          },
        );
        const responseData = await response.json();
        if (responseData.message == 'Bulk tickets stored successfully') {
          InsertDataFunction('Local_schedule_ticket', createTicketsData);
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

export default Create_Offline_Invoice_Api;
