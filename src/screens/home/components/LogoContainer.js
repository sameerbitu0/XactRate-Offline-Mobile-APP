import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import STRING_CONSTANTS from '../../../strings/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LogoContainer = () => {
  const [dataState, setDataState] = useState();

  const getInvoiceData = async () => {
    try {
      var userData = await AsyncStorage.getItem('userData');
      userData = JSON.parse(userData);
      setDataState(userData.user);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getInvoiceData();
  }, []);

  return (
    <View style={styles.MainContainer}>
      <Image
        style={styles.XrLogo}
        source={require('../../../assets/logo_png.png')}
      />
      <Text style={styles.UserNameTittle}>
        {STRING_CONSTANTS.user_name_tittle}{' '}
        {dataState ? dataState.full_name : ''}
      </Text>
    </View>
  );
};

export default LogoContainer;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  XrLogo: {
    alignSelf: 'center',
    width: 150,
    height: 80,
    resizeMode: 'cover',
  },
  UserNameTittle: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
    margin: 10,
    fontWeight: '700',
  },
});
