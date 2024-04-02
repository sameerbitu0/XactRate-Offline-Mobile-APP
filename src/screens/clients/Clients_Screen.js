import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import STRING_CONSTANTS from '../../strings/strings';
import Clients_Api from '../../Components/api/Clients_Api';
import ClientsItem from './components/ClientsItem';
import SearchBarContainer from './components/SearchBarContainer';
import BottomTabBar from '../../Components/BottomTabBar';
import hitAPIBasedOnStatusAndConnection from '../../Components/api/hitAPIBasedOnStatusAndConnection';


const Clients_Screen = () => {
  const [dataState, setDataState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(2);
  const searchClients = dataState.filter(
    item =>
      item.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('userToken');
      hitAPIBasedOnStatusAndConnection();
      const data = await Clients_Api(userToken);
      setDataState(data);
      setError('');
    } catch (error) {
      setError('Error fetching schedule data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setDataState([]);
      setLoading(true);
      fetchData();
    }, []),
  );

  const onRefresh = () => {
    setSearchQuery('');
    setRefreshing(true);
    fetchData();
  };

  const renderFooter = () => {
    return null;
  };

  const renderItem = ({item}) => {
    return <ClientsItem item={item} />;
  };

  const handleSearch = text => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={{flex: 1}}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={40} color="#7ed321" />
          </View>
        ) : error ? (
          <View style={styles.nullDataContainer}>
            <Text style={styles.nullDataText}>{error}</Text>
          </View>
        ) : dataState.length > 0 ? (
          <>
            <SearchBarContainer
              searchQuery={searchQuery}
              onSearch={handleSearch}
            />
            <FlatList
              data={searchQuery.length > 0 ? searchClients : dataState}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              ListFooterComponent={renderFooter}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  tintColor={'#8bc34a'}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          </>
        ) : (
          <View style={styles.nullDataContainer}>
            <Text style={styles.nullDataText}>
              {STRING_CONSTANTS.null_screen_data_string}
            </Text>
          </View>
        )}
      </View>
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default Clients_Screen;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  nullDataContainer: {
    flex: 1,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nullDataText: {
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    padding: 18,
    shadowColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
