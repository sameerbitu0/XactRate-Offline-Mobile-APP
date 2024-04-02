import URL_CONFIG from '../global-config';
import {CreateTableFunction} from './CreateTableFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {GetAllDataFunction} from './GetAllDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Catalogs_Api = async userToken => {
  try {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      // Fetch data from API
      const response = await fetch(URL_CONFIG.Url + URL_CONFIG.catalogs_api, {
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
      const {data} = dataResponse.catalogs;
      CreateTableFunction('catalogs_data');
      InsertDataFunction('catalogs_data', data);
      const dataNew = await GetAllDataFunction('catalogs_data');
      return dataNew;
    } else {
      const dataNew = await GetAllDataFunction('catalogs_data');
      return dataNew;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Catalogs_Api;
