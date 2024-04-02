import URL_CONFIG from '../global-config';
import {CreateTableFunction} from './CreateTableFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {GetAllDataFunction} from './GetAllDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Contingency_Product_Api = async userToken => {
  try {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      // Fetch data from API
      const response = await fetch(
        URL_CONFIG.Url + URL_CONFIG.warranty_percentage_api,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const dataResponse = await response.json();
      const data = dataResponse.contingency_product;
      CreateTableFunction('contingency_product_data');
      InsertDataFunction('contingency_product_data', data);
      const dataNew = await GetAllDataFunction('contingency_product_data');
      return dataNew;
    } else {
      const dataNew = await GetAllDataFunction('contingency_product_data');
      return dataNew;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Contingency_Product_Api;
