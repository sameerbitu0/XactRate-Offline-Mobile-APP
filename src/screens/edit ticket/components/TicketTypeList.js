import React from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native';

const TicketTypeList = ({data, onSelectTicketType}) => {
  return (
    <View style={styles.MainContainerClientList}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.TicketTypeListButtons}
            onPress={() => onSelectTicketType(item)}>
            <Text style={styles.TicketTypeListText}>{item.des}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TicketTypeList;

const styles = StyleSheet.create({
  MainContainerClientList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  TicketTypeListButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 5,
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
  TicketTypeListText: {
    color: '#000000',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },
});
