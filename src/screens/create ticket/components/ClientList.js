import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import STRING_CONSTANTS from '../../../strings/strings';

const ClientList = ({data, selectClientName}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchClients = data.filter(
    item =>
      item.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lname.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <View style={styles.MainContainerClientList}>
      <Text style={styles.ClientBottomSheetTittle}>
        {STRING_CONSTANTS.select_client_bottom_sheet_title}
      </Text>
      <TextInput
        placeholder="Search..."
        placeholderTextColor={'#666666'}
        style={styles.ClientSearchBar}
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
        }}
      />
      <FlatList
        data={searchQuery.length > 0 ? searchClients : data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.ClientDataViewBox}
            onPress={() => selectClientName(item)}>
            <View style={styles.ClientDataBox}>
              <View style={styles.DataViewClientList}>
                <Text style={styles.ClientNameText}>
                  {item.fname} {item.lname}
                </Text>
                <Text style={styles.ClientDataText}>+{item.phone_no_1}</Text>
                <Text style={styles.ClientDataText}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({
  MainContainerClientList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  ClientBottomSheetTittle: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  ClientSearchBar: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAEAEA',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    color: '#444444',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  ClientDataText: {
    color: '#808080',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    margin: 2,
  },
  ClientDataViewBox: {
    margin: 5,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderColor: '#cccccc',
    borderRadius: 5,
  },
  DataViewClientList: {
    flexDirection: 'column',
  },
  ClientDataBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  ClientNameText: {
    color: '#333333',
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    margin: 2,
  },
});
