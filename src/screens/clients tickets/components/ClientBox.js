import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ClientBox = ({ClientFName, ClientLName, ClientEmail, ClientMobile}) => {
  return (
    <View style={styles.ClientBoxContainer}>
      <Text style={styles.ClientBoxNameText}>
        {ClientFName} {ClientLName}
      </Text>
      <View style={styles.ClientBoxDetailContainer}>
        <Image
          style={styles.ImageIcon}
          source={require('../../../assets/Email.png')}
        />
        <Text style={styles.ClientDataDetailText}>{ClientEmail}</Text>
      </View>
      <View style={styles.ClientBoxDetailContainer}>
        <Image
          style={styles.ImageIcon}
          source={require('../../../assets/Call.png')}
        />
        <Text style={styles.ClientDataDetailText}>+{ClientMobile}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ClientBoxContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 5,
  },
  ClientBoxNameText: {
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontSize: 30,
    padding: 8,
    paddingLeft: 30,
  },
  ClientDataDetailText: {
    color: '#4B4B4B',
    fontFamily: 'DMSans-Medium',
    fontSize: 18,
    padding: 8,
    flex: 1,
  },
  ImageIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  ClientBoxDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
});

export default ClientBox;
