import URL_CONFIG from '../global-config';
import {CreateTableFunction} from './CreateTableFunction';
import {InsertDataFunction2} from './Create_Offline';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Create_Ticket_Api = async (userToken, postData, offnlinePostData) => {
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
      var data = [offnlinePostData];
      CreateTableFunction('Local_schedule_ticket');
      InsertDataFunction2('Local_schedule_ticket', data);
      var response = 'Data inserted successfully!';
      return response;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Create_Ticket_Api;
