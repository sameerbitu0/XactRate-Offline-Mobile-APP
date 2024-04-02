import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Dashboard_Api from '../../Components/api/Dashboard_Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardBox from './components/DashboardBox';
import LogoContainer from './components/LogoContainer';
import {
  useIsFocused,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import ClientsContainer from './components/ClientsContainer';
import TicketsContainer from './components/TicketsContainer';
import BottomTabBar from '../../Components/BottomTabBar';
import hitAPIBasedOnStatusAndConnection from '../../Components/api/hitAPIBasedOnStatusAndConnection';


const Home_Screen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [dataState, setDataState] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const fetchData = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    try {
      hitAPIBasedOnStatusAndConnection();
      const data = await Dashboard_Api(userToken);
      const {clients, tickets, closeTicket, openTicket, scheduleTicket} =
        data[0];
      setDataState({
        clients: clients || null,
        tickets: tickets || null,
        closeTicket: closeTicket || 0,
        openTicket: openTicket || 0,
        scheduleTicket: scheduleTicket || 0,
      });
    } catch (error) {
      // Handle error
      console.error('Error fetching brand data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setDataState(null);
      fetchData();
    }, []),
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    };
  }, [handleBackButton]);

  const handleBackButton = () => {
    if (isFocused) {
      BackHandler.exitApp();
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <LogoContainer />
          <DashboardBox
            openTicket={dataState ? dataState.openTicket : null}
            closeTicket={dataState ? dataState.closeTicket : null}
            scheduleTicket={dataState ? dataState.scheduleTicket : null}
          />
          <ClientsContainer clients={dataState ? dataState.clients : null} />
          <TicketsContainer tickets={dataState ? dataState.tickets : null} />
        </View>
      </ScrollView>
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default Home_Screen;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
