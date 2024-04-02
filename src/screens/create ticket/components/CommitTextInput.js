import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const CommitTextInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  style,
  ...rest
}) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginVertical:15,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    color: 'black',
    fontSize: 16,
    borderColor: '#B2B9BF',
    fontFamily: 'DMSans-Medium',
    paddingHorizontal: 20,
    paddingVertical:15
  },
});

export default CommitTextInput;
