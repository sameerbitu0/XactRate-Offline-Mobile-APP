import React, {useState} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const DatePickerComponent = ({date, setDate}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showMode = currentMode => {
    setShow(true);
  };

  const handleConfirm = date => {
    setShow(false);
    setSelectedDate(date);
    setDate(date);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const showDatePickerIos = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#202020', '#606060', '#202020']}
        style={{
          backgroundColor: '#5dbf06',
          alignItems: 'center',
          borderRadius: 5,
          paddingVertical: 2,
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'ios' ? showDatePickerIos() : showMode('date')
          }
          style={styles.MainContainerDatePicker}>
          <Text style={styles.DateText}>{date}</Text>
          <TouchableOpacity
            onPress={() =>
              Platform.OS === 'ios' ? showDatePickerIos() : showMode('date')
            }></TouchableOpacity>
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
      </LinearGradient>
    </View>
  );
};

export default DatePickerComponent;
const styles = StyleSheet.create({
  container: {},
  MainContainer: {
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
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    margin: 10,
    alignSelf: 'center',
    borderColor: '#B2B9BF',
  },
  DateText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
  },
});
