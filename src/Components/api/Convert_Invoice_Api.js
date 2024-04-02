import URL_CONFIG from '../global-config';
import {CreateTableFunction} from './CreateTableFunction';
import {InsertDataFunction2} from './Create_Offline';
import {GetAllDataFunction} from './GetAllDataFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Convert_Invoice_Api = async (
  userToken,
  postData,
  offlinePostData,
  index,
  TicketId,
) => {
  try {
    const isConnected = await checkInternetConnectivity();
    const localData = await GetAllDataFunction(
      TicketId == null ? 'Local_schedule_ticket' : 'schedules_tickets_data',
      localData,
    );
    if (isConnected) {
      const response = await fetch(
        URL_CONFIG.Url + URL_CONFIG.invoices_save_api,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(postData),
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      return responseData;
    } else {
      if (TicketId) {
        var array = localData;
        if (index > -1) {
          array.splice(index, 1);
        }
        InsertDataFunction('schedules_tickets_data', array);
      } else {
        var array = localData;
        if (index > -1) {
          array.splice(index, 1);
        }
        InsertDataFunction('Local_schedule_ticket', array);
      }
      CreateTableFunction('Local_schedule_ticket');
      InsertDataFunction2('Local_schedule_ticket', offlinePostData);
      var response = 'Data inserted successfully!';
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Convert_Invoice_Api;
