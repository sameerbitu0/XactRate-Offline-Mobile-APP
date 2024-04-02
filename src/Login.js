import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  BackHandler,
  Modal,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL_CONFIG from './Components/global-config';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import STRING_CONSTANTS from './strings/strings';
import NAVIGATION_STRING_CONSTANTS from './navigation/NavigarionStringConstants';
import Clients_Api from './Components/api/Clients_Api';
import Schedules_Api from './Components/api/Schedules_Api';
import Suspend_Tickets_Api from './Components/api/Suspend_Tickets_Api';
import All_Tickets_Api from './Components/api/All_Tickets_Api';
import Closed_Tickets_Api from './Components/api/Closed_Tickets_Api';
import Schedules_Tickets_Api from './Components/api/Schedules_Tickets_Api';
import Decline_Tickets_Api from './Components/api/Decline_Tickets_Api';
import Dashboard_Api from './Components/api/Dashboard_Api';
import Tickets_Type_Api from './Components/api/Tickets_Type_Api';
import Catalogs_Api from './Components/api/Catalogs_Api';
import Categories_Api from './Components/api/Categories_Api';
import Employees_Api from './Components/api/Employees_Api';
import Service_Agreement_Api from './Components/api/Service_Agreement_Api';
import Warranty_Percentage_Api from './Components/api/Warranty_Percentage_Api';
import Contingency_Product_Api from './Components/api/Contingency_Product_Api';
import Products_Api from './Components/api/Products_Api';
import {checkInternetConnectivity} from './Components/api/checkInternetConnectivity';
import deleteTable from './Components/api/deleteTable';
import hitAPIBasedOnStatusAndConnection from './Components/api/hitAPIBasedOnStatusAndConnection';

const Login = () => {
  const navigation = useNavigation();

  //// Variable initialization  ////
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState('user@mail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  // async function dataSand() {
  //   const isConnected = await checkInternetConnectivity();
  //   if (isConnected) {
  //     setLoading(true);
  //     try {
  //       const userToken = await AsyncStorage.getItem('userToken');
  //       if (userToken) {
  //         var responseData = await hitAPIBasedOnStatusAndConnection();
  //         if (responseData) {
  //           if (responseData.message == 'Bulk tickets stored successfully') {
  //             const response = await fetch(
  //               `${URL_CONFIG.Url}${URL_CONFIG.logout_api}`,
  //               {
  //                 method: 'GET',
  //                 headers: {
  //                   'content-type': 'application/json',
  //                   accept: 'application/json',
  //                   Authorization: `Bearer ${userToken}`,
  //                 },
  //               },
  //             );
  //             const responseJson = await response.json();
  //             if (responseJson.success === 'true') {
  //               deleteTable('Local_schedule_ticket');
  //               const asyncStorageKeys = await AsyncStorage.getAllKeys();
  //               if (asyncStorageKeys.length > 0) {
  //                 if (Platform.OS === 'android') {
  //                   await AsyncStorage.clear();
  //                   loginButton();
  //                 } else if (Platform.OS === 'ios') {
  //                   await AsyncStorage.multiRemove(asyncStorageKeys);
  //                   loginButton();
  //                 }
  //               }
  //             } else {
  //               deleteTable('Local_schedule_ticket');
  //               const asyncStorageKeys = await AsyncStorage.getAllKeys();
  //               if (asyncStorageKeys.length > 0) {
  //                 if (Platform.OS === 'android') {
  //                   await AsyncStorage.clear();
  //                   loginButton();
  //                 } else if (Platform.OS === 'ios') {
  //                   await AsyncStorage.multiRemove(asyncStorageKeys);
  //                   loginButton();
  //                 }
  //               }
  //             }
  //           }
  //         } else {
  //           loginButton();
  //         }
  //       } else {
  //         loginButton();
  //       }
  //     } catch (error) {
  //       console.error('An error occurred:', error);
  //     }
  //   }else {
  //     Alert.alert('User cannot login without the internet');
  //   }
  // }

  async function dataSand() {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      setLoading(true);
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const responseData = await hitAPIBasedOnStatusAndConnection();
          if (
            responseData &&
            responseData.message === 'Bulk tickets stored successfully'
          ) {
            const response = await fetch(
              `${URL_CONFIG.Url}${URL_CONFIG.logout_api}`,
              {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  Authorization: `Bearer ${userToken}`,
                },
              },
            );
            const responseJson = await response.json();
            if (responseJson.success === 'true') {
              deleteAndLogout();
            } else {
              deleteAndLogout();
            }
          } else {
            const response = await fetch(
              `${URL_CONFIG.Url}${URL_CONFIG.logout_api}`,
              {
                method: 'GET',
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json',
                  Authorization: `Bearer ${userToken}`,
                },
              },
            );
            const responseJson = await response.json();
            if (responseJson.success === 'true') {
              deleteAndLogout();
            } else {
              deleteAndLogout();
            }
          }
        } else {
          loginButton();
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      Alert.alert('User cannot login without the internet');
    }
  }

  async function deleteAndLogout() {
    deleteTable('Local_schedule_ticket');
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear();
      } else if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
      }
    }
    loginButton();
  }

  useFocusEffect(
    useCallback(() => {
      // setPassword();
      // setEmail();
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );

  /**
   * Error Message Return Function
   */

  function messageReturn() {
    if (errorMessage) {
      return <Text style={styles.ErrorMessage}> {errorMessage} </Text>;
    }
  }

  /**
   * Submit button on press go to login user
   */

  const loginButton = async () => {
    if (!email) {
      setErrorMessage(STRING_CONSTANTS.email_required);
      setLoading(false);
    } else if (!password) {
      setErrorMessage(STRING_CONSTANTS.password_required);
      setLoading(false);
    } else {
      setLoading(true);
      try {
        const isConnected = await checkInternetConnectivity();
        if (isConnected) {
          const response = await fetch(URL_CONFIG.Url + 'api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
          });
          const data = await response.json();
          if (data.success == true) {
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userTokenLocally', data.token);
            await AsyncStorage.setItem('userData', JSON.stringify(data));
            const userToken = await AsyncStorage.getItem('userToken');
            Dashboard_Api(userToken);
            Clients_Api(userToken);
            Schedules_Api(userToken);
            Schedules_Tickets_Api(userToken);
            Suspend_Tickets_Api(userToken);
            Decline_Tickets_Api(userToken);
            Closed_Tickets_Api(userToken);
            All_Tickets_Api(userToken);
            Tickets_Type_Api(userToken);
            Catalogs_Api(userToken);
            Categories_Api(userToken);
            Products_Api(userToken);
            Employees_Api(userToken);
            Service_Agreement_Api(userToken);
            Warranty_Percentage_Api(userToken);
            Contingency_Product_Api(userToken);
            navigation.navigate('Root', {
              screen: NAVIGATION_STRING_CONSTANTS.schedule_screen,
            });
            setLoading(false);
          } else if (data.success == false) {
            Alert.alert(data.message);
            setLoading(false);
          } else {
            Alert.alert(data.message);
            setLoading(false);
          }
        } else {
          Alert.alert('User cannot login without the internet');
          setLoading(false);
        }
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <ScrollView>
          <Image
            style={styles.Logo}
            source={require('./assets/logo_png.png')}
          />
          <View style={styles.LoginScreenContainer}>
            <Text style={styles.logoText}>
              {STRING_CONSTANTS.login_screen_welcome_text}
            </Text>
            <Text style={styles.subHeading}>
              {STRING_CONSTANTS.login_screen_sub_heading_text}
            </Text>
            <TextInput
              type="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={email => {
                setEmail(email);
                setErrorMessage();
              }}
              style={styles.LoginFormTextInput}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={password => {
                setPassword(password);
                setErrorMessage();
              }}
              style={styles.LoginFormTextInput}
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  NAVIGATION_STRING_CONSTANTS.reset_password_screen,
                )
              }>
              <Text style={styles.Forgot_Button}>
                {STRING_CONSTANTS.forgot_password_login}
              </Text>
            </TouchableOpacity>

            {messageReturn()}
          </View>
          <TouchableOpacity
            style={styles.ButtonStyle}
            onPress={() => dataSand()}>
            <Text style={styles.loginText}> LOGIN </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{flex: 1}}>
          <Modal animationType="fade" transparent={true} visible={loading}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#5dbf06" />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  LoginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  Logo: {
    alignSelf: 'center',
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },

  logoText: {
    fontSize: 25,
    paddingVertical: 5,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'DMSans-Bold',
  },

  subHeading: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'DMSans-Bold',
  },

  LoginFormTextInput: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fafafa',
    color: 'black',
    fontSize: 16,
    borderColor: '#B2B9BF',
    margin: 10,
    fontFamily: 'DMSans-Medium',
    padding: 15,
  },
  Forgot_Button: {
    margin: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },
  ButtonStyle: {
    backgroundColor: '#5dbf06',
    borderWidth: 1,
    borderColor: '#7DE24E',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 20,
  },
  loginText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
  },
  ErrorMessage: {
    marginVertical: 10,
    color: 'red',
    textAlign: 'center',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },
});
