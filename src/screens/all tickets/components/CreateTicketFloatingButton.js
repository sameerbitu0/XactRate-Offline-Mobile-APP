import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import NAVIGATION_STRING_CONSTANTS from '../../../navigation/NavigarionStringConstants';
import {useNavigation} from '@react-navigation/native';
const CreateTicketFloatingButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.FloatingButton}
      onPress={() =>
        navigation.navigate(NAVIGATION_STRING_CONSTANTS.create_ticket_screen)
      }>
      <Image
        style={styles.ImageFloatingButton}
        source={require('../../../assets/FloatingButton.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FloatingButton: {
    borderRadius: 50,
    position: 'absolute',
    height: 80,
    width: 80,
    backgroundColor: '#FFFFFF',
    borderColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
    right: 30,
    bottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.38,
    shadowRadius: 5.5,
    elevation: 10,
  },
  ImageFloatingButton: {
    resizeMode: 'contain',
    height: 55,
    width: 55,
  },
});

export default CreateTicketFloatingButton;
