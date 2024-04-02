import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const CustomButtonRemove = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.DeleteTicketButtonStyle} onPress={onPress}>
      <Image
        style={styles.DeleteTicketImage}
        source={require('../../../assets/close.png')}
      />
      <Text style={styles.DeleteTicketText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  DeleteTicketButtonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:20
  },
  DeleteTicketText: {
    color: '#F44336',
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
  },
  DeleteTicketImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#F44336',
    marginHorizontal: 10,
  },
});

export default CustomButtonRemove;
