// Importing necessary modules and constants
import URL_CONFIG from '../global-config';
import {GetAllDataFunction} from './GetAllDataFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Remove_Ticket_Api = async (userToken, id, index) => {
  try {
    const isConnected = await checkInternetConnectivity();
    const data = await GetAllDataFunction('Local_schedule_ticket');

    if (isConnected) {
      const response = await fetch(
        URL_CONFIG.Url + URL_CONFIG.tickets_delete_api + id,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData;
    } else {
      var tableName = 'Local_schedule_ticket';
      var array = data;
      if (index > -1) {
        array.splice(index, 1); // İstenen dizini kaldırır
      }
      InsertDataFunction(tableName, array);
      const parsedData = 'Tickiet Removed Successfully.';
      return parsedData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Remove_Ticket_Api;
