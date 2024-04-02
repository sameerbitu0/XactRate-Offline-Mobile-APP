import React, {useEffect, useRef} from 'react';
import {StyleSheet, SafeAreaView, Animated, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import STRING_CONSTANTS from './strings/strings';
import URL_CONFIG from './Components/global-config';
import NAVIGATION_STRING_CONSTANTS from './navigation/NavigarionStringConstants';
import {checkInternetConnectivity} from './Components/api/checkInternetConnectivity';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash_Screen = () => {
  const navigation = useNavigation();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate();
  }, []);

  const animate = async () => {
    try {
      await checkInternetConnectivity();
      await getUserToken();
    } catch (error) {
      console.warn(error);
    }
  };

  const getUserToken = async () => {
    try {
      const isConnected = await checkInternetConnectivity();
      if (isConnected) {
        const userToken = await AsyncStorage.getItem('userToken');
        const userTokenLocally = await AsyncStorage.getItem('userTokenLocally');

        if (userToken && userTokenLocally) {
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          };

          const response = await fetch(
            URL_CONFIG.Url + 'api/dashboard',
            options,
          );
          const newData = await response.json();

          if (newData.success) {
            const UserToken = await AsyncStorage.getItem('userToken');
            if (!UserToken) {
              navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
            } else {
              navigation.navigate('Root', {
                screen: NAVIGATION_STRING_CONSTANTS.schedule_screen,
              });
            }
          } else if (!newData.success && newData.status_code === 401) {
            await AsyncStorage.clear(); // Clear all AsyncStorage data on 401 Unauthorized
            navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
          }
        } else {
          navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
        }
      } else {
        const userTokenLocally = await AsyncStorage.getItem('userTokenLocally');
        if (userTokenLocally) {
          navigation.navigate('Root', {
            screen: NAVIGATION_STRING_CONSTANTS.schedule_screen,
          });
        } else {
          navigation.navigate(NAVIGATION_STRING_CONSTANTS.login_screen);
        }
      }
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  const fadeIn = () => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <Animated.Image
        style={[styles.ImageLogo, {opacity: logoOpacity}]}
        source={require('./assets/logo_png.png')}
        onLoad={fadeIn}
      />
      <Animated.Text style={[styles.LogoText, {opacity: textOpacity}]}>
        {STRING_CONSTANTS.splash_screen_text}
      </Animated.Text>
    </SafeAreaView>
  );
};

export default Splash_Screen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  ImageLogo: {
    alignSelf: 'center',
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  LogoText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'DMSans-Bold',
  },
});
