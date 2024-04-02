import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NAVIGATION_STRING_CONSTANTS from '../navigation/NavigarionStringConstants';
import {Logout_Api} from './api/Logout_Api';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    changeOrientation();
  }, []);

  /**
   * orientationChange when screen refresh and screen are updated
   */
  function changeOrientation() {
    const handleOrientationChange = () => {
      const {width, height} = Dimensions.get('window');
      if (width > height) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };
    const showListenerDimensions = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    const removeListenerDimensions = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    return () => {
      removeListenerDimensions.remove();
      showListenerDimensions.remove();
    };
  }

  function invoiceOnPress() {
    navigation.navigate(NAVIGATION_STRING_CONSTANTS.ticket_screen);
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  /**
   * Logout function
   */

  const logout = async () => {
    Logout_Api(navigation);
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
          <Image
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: 220,
              height: 130,
              resizeMode: 'contain',
            }}
            source={require('../assets/logo_png.png')}
          />
          <DrawerItemList {...props} />
          <TouchableOpacity onPress={() => invoiceOnPress()}>
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                fontSize: 15,
                color: '#333333',
                marginLeft: 20,
                marginTop: 18,
                fontWeight: '600',
              }}>
              Ticket
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                fontSize: 15,
                color: '#333333',
                marginLeft: 20,
                marginTop: 20,
                fontWeight: '600',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
