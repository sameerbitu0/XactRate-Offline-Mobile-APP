import URL_CONFIG from '../global-config';
import {CreateTableFunction} from './CreateTableFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {GetAllDataFunction} from './GetAllDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Schedules_Api = async userToken => {
  try {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      // Fetch data from API
      const response = await fetch(URL_CONFIG.Url + URL_CONFIG.schedules_api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataResponse = await response.json();
      const data = dataResponse.tickets;
      CreateTableFunction('schedules_data');
      InsertDataFunction('schedules_data', data);
      const dataNew = await GetAllDataFunction('schedules_data');
      return dataNew;
    } else {
      const dataNew = await GetAllDataFunction('schedules_data');
      return dataNew;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Schedules_Api;
