import URL_CONFIG from '../global-config';
import {CreateTableFunction} from './CreateTableFunction';
import {InsertDataFunction} from './StoreDataFunction';
import {GetAllDataFunction} from './GetAllDataFunction';
import {checkInternetConnectivity} from './checkInternetConnectivity';

const Service_Agreement_Api = async userToken => {
  try {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      // Fetch data from API
      const response = await fetch(
        URL_CONFIG.Url + URL_CONFIG.service_agreement_api,
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
      const {data} = dataResponse.service_agreements;
      CreateTableFunction('service_agreement_data');
      InsertDataFunction('service_agreement_data', data);
      const dataNew = await GetAllDataFunction('service_agreement_data');
      return dataNew;
    } else {
      const dataNew = await GetAllDataFunction('service_agreement_data');
      return dataNew;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default Service_Agreement_Api;
