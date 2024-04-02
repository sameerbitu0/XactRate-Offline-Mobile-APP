import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const GlobalButton = ({ onPress, text, imageSource }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
      <Image
        style={styles.buttonImage}
        source={imageSource}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    textAlign: 'center',
  },
  buttonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: 'black',
  },
});

export default GlobalButton;
