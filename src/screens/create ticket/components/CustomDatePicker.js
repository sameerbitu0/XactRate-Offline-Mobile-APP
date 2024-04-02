import React, {useState} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';

const CustomDatePicker = ({label, date, setDate}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showMode = currentMode => {
    setShow(true);
  };

  const handleConfirm = date => {
    setShow(false);
    setSelectedDate(date);
    setDate(date); // Assuming setDate is a function passed as prop to update the date in parent component
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const showDatePickerIos = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.InputFieldLabelText}>{label}</Text>
      <TouchableOpacity
        onPress={() =>
          Platform.OS === 'ios' ? showDatePickerIos() : showMode('date')
        }
        style={styles.MainContainerDatePicker}>
        <Text style={styles.DateText}>{date}</Text>
        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'ios' ? showDatePickerIos() : showMode('date')
          }>
          <Image
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              tintColor: 'black',
            }}
            source={require('../../../assets/calendar.png')}
          />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <DateTimePickerModal
            date={selectedDate}
            isVisible={show}
            mode="date"
            //display="inline"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        )}
        {Platform.OS === 'android' && show && (
          <RNDateTimePicker
            value={selectedDate}
            mode={'date'}
            is24Hour={true}
            display={'default'}
            onChange={(event, date) => {
              if (event.type === 'set') {
                handleConfirm(date);
              } else {
                hideDatePicker();
              }
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomDatePicker;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  InputFieldLabelText: {
    color: '#808080',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    marginTop: 18,
    marginLeft: 5,
  },
  MainContainerDatePicker: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 6,
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#B2B9BF',
  },
  DateText: {
    color: '#333333',
    fontSize: 16,
    margin: 10,
    fontFamily: 'DMSans-Medium',
  },
});
