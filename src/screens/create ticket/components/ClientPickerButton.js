import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
const ClientPickerButton = ({onPress, tittle, label}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.InputFieldLabelText}>{label}</Text>
      <TouchableOpacity style={styles.ClientFieldView} onPress={onPress}>
        <Text style={styles.SelectClientAndTicketField}>{tittle}</Text>
        <Image
          style={styles.DropDownIcon}
          source={require('../../../assets/DropDown.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
  },
  InputFieldLabelText: {
    color: '#808080',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    marginTop: 18,
    marginLeft: 5,
  },
  ClientFieldView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B2B9BF',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  SelectClientAndTicketField: {
    flex: 1,
    color: '#000000',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  DropDownIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'black',
  },
});

export default ClientPickerButton;
