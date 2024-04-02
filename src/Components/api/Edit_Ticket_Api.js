import URL_CONFIG from '../global-config';
import {InsertDataFunction} from './StoreDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Edit_Ticket_Api = async (userToken, postData) => {
  try {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      const response = await fetch(
        URL_CONFIG.Url + URL_CONFIG.tickets_save_api,
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
      var tableName = 'Local_schedule_ticket';
      //  var data = postData;
      //InsertDataFunction(tableName, data);
      const parsedData = 'connection error!';
      return parsedData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Edit_Ticket_Api;
