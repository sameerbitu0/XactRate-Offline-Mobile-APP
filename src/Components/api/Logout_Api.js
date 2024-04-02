import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import URL_CONFIG from '../global-config';
import NAVIGATION_STRING_CONSTANTS from '../../navigation/NavigarionStringConstants';
import deleteTable from './deleteTable';
import {Platform} from 'react-native';

const Logout_Api = async navigation => {
  try {
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      const userTokenLocally = await AsyncStorage.getItem('userTokenLocally');
      if (userTokenLocally) {
        await AsyncStorage.removeItem('userTokenLocally');
        navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
        alert('Logout Successfully.');
        return;
      }
    }

    const userToken = await AsyncStorage.getItem('userToken');

    const response = await fetch(`${URL_CONFIG.Url}${URL_CONFIG.logout_api}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson.success === 'true') {
      deleteTable('Local_schedule_ticket');
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        if (Platform.OS === 'android') {
          await AsyncStorage.clear();
        } else if (Platform.OS === 'ios') {
          await AsyncStorage.multiRemove(asyncStorageKeys);
        }
      }

      navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
    }
  } catch (error) {
    console.warn(error);
  }
};

export {Logout_Api};
