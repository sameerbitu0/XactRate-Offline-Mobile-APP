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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import STRING_CONSTANTS from '../../strings/strings';
import TicketItem from './components/TicketItem';
import BottomTabBar from '../../Components/BottomTabBar';
import Schedules_Api from '../../Components/api/Schedules_Api';
import hitAPIBasedOnStatusAndConnection from '../../Components/api/hitAPIBasedOnStatusAndConnection';

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const [dataState, setDataState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  const fetchData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      hitAPIBasedOnStatusAndConnection();
      const data = await Schedules_Api(userToken);
      const sortedItems = [...data].sort((a, b) => b.id - a.id);
      setDataState(sortedItems);
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
      setLoading(true);
      fetchData();
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderFooter = () => {
    return null;
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
          <FlatList
            data={dataState}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <TicketItem item={item} index={index} />
            )}
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

export default ScheduleScreen;

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
