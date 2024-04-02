import React, {useState, useRef} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import STRING_CONSTANTS from '../../strings/strings';
import BottomTabBar from '../../Components/BottomTabBar';
import TabSelector from './components/TabSelector';
import Schedules_Tickets_Api from '../../Components/api/Schedules_Tickets_Api';
import TicketItem from './components/TicketItem';
import Closed_Tickets_Api from '../../Components/api/Closed_Tickets_Api';
import Suspend_Tickets_Api from '../../Components/api/Suspend_Tickets_Api';
import Decline_Tickets_Api from '../../Components/api/Decline_Tickets_Api';
import All_Tickets_Api from '../../Components/api/All_Tickets_Api';
import GlobalBottomSheet from './components/GlobalBottomSheet';
import GlobalButton from './components/GlobalButton';
import NAVIGATION_STRING_CONSTANTS from '../../navigation/NavigarionStringConstants';
import ClientBox from './components/ClientBox';

const AllTickets_Screen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const route = useRoute();
  const {ClientId, ClientFName, ClientLName, ClientEmail, ClientMobile} =
    route.params;
  const [dataState, setDataState] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTab, setSelectedTab] = useState('Schedule');
  const [parameter, setParameter] = useState();
  const [parameterEditTicket, setParameterEditTicket] = useState();
  const [parameterTicketDetail, setParameterTicketDetail] = useState();

  const fetchData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const data = await Schedules_Tickets_Api(userToken);
      const filteredData = data.filter(item => item.client_id == ClientId);
      setDataState(filteredData);
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
      setSelectedTab('Schedule');
      setLoading(true);
      fetchData();
    }, []),
  );

  const fetchDataCloseTicket = async () => {
    setDataState([]);
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const data = await Closed_Tickets_Api(userToken);
      const filteredData = data.filter(item => item.client_id == ClientId);
      setDataState(filteredData);
      setError('');
    } catch (error) {
      setError('Error fetching schedule data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchDataSuspendTicket = async () => {
    setDataState([]);
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const data = await Suspend_Tickets_Api(userToken);
      const filteredData = data.filter(item => item.client_id == ClientId);
      setDataState(filteredData);
      setError('');
    } catch (error) {
      setError('Error fetching schedule data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchDataDeclineTicket = async () => {
    setDataState([]);
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const data = await Decline_Tickets_Api(userToken);
      const filteredData = data.filter(item => item.client_id == ClientId);
      setDataState(filteredData);
      setError('');
    } catch (error) {
      setError('Error fetching schedule data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchDataAllTicket = async () => {
    setDataState([]);
    setLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const data = await All_Tickets_Api(userToken);
      const filteredData = data.filter(item => item.client_id == ClientId);
      setDataState(filteredData);
      setError('');
    } catch (error) {
      setError('Error fetching schedule data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setSelectedTab('Schedule');
    setRefreshing(true);
    fetchData();
  };

  const handleTabSelect = tab => {
    setSelectedTab(tab);
    if (tab == 'Schedule') {
      setDataState([]);
      setLoading(true);
      fetchData();
    } else if (tab == 'Closed') {
      fetchDataCloseTicket();
    } else if (tab == 'Suspend') {
      fetchDataSuspendTicket();
    } else if (tab == 'Decline') {
      fetchDataDeclineTicket();
    } else if (tab == 'All') {
      fetchDataAllTicket();
    }
  };

  /**
   * Set param in variable
   */

  function Param(item) {
    setParameter({
      ClientId: item.client_id,
      TicketId: item.id,
      ClientFName: item.first_name,
      ClientLName: item.last_name,
      ClientEmail: item.email,
      ClientMobile: item.phone_no_1,
      TicketDescription: item.ticket_type_description,
      TicketTypeId: item.ticket_type_id,
      Status: item.status,
    });
    setParameterEditTicket({
      _Id: item.id,
      Client_Id: item.client_id,
      Ticket_TypeId: item.ticket_type_id,
      Ticket_Date: item.date,
      Client_FName: item.first_name,
      Client_LName: item.last_name,
      Ticket_TypeName: item.ticket_type_description,
      ClientEmail: item.email,
      TicketNotes: item.ticket_notes,
      Status: item.status,
    });
    setParameterTicketDetail({
      ClientId: item.client_id,
      TicketId: item.id,
      ClientFName: item.first_name,
      ClientLName: item.last_name,
      ClientEmail: item.email,
      ClientMobile: item.phone_no_1,
    });
    bottomSheetRef.current.openBottomSheet();
  }

  /**
   * Set param convertToInvoice
   */

  function convertToInvoice() {
    navigation.navigate(NAVIGATION_STRING_CONSTANTS.ticket_screen, {
      ClientId: parameter.ClientId,
      TicketId: parameter.TicketId,
      ClientFName: parameter.ClientFName,
      ClientLName: parameter.ClientLName,
      ClientEmail: parameter.ClientEmail,
      ClientMobile: parameter.ClientMobile,
      TicketDescription: parameter.TicketDescription,
      TicketTypeId: parameter.TicketTypeId,
      Status: parameter.Status,
    });
    bottomSheetRef.current.closeBottomSheet();
  }

  /**
   * Set param convertToInvoice
   */

  function EditTicket() {
    navigation.navigate(NAVIGATION_STRING_CONSTANTS.edit_ticket_screen, {
      _Id: parameterEditTicket._Id,
      Client_Id: parameterEditTicket.Client_Id,
      Ticket_TypeId: parameterEditTicket.Ticket_TypeId,
      Ticket_Date: parameterEditTicket.Ticket_Date,
      Client_FName: parameterEditTicket.Client_FName,
      Client_LName: parameterEditTicket.Client_LName,
      Ticket_TypeName: parameterEditTicket.Ticket_TypeName,
      ClientEmail: parameterEditTicket.ClientEmail,
      ClientMobile: parameterEditTicket.ClientMobile,
      TicketNotes: parameterEditTicket.TicketNotes,
    });
    bottomSheetRef.current.closeBottomSheet();
  }

  /**
   * Set param convertToInvoice
   */

  function TicketDetail() {
    navigation.navigate(NAVIGATION_STRING_CONSTANTS.download_screen, {
      ClientId: parameterTicketDetail.ClientId,
      TicketId: parameterTicketDetail.TicketId,
      ClientFName: parameterTicketDetail.ClientFName,
      ClientLName: parameterTicketDetail.ClientLName,
      ClientEmail: parameterTicketDetail.ClientEmail,
      ClientMobile: parameterTicketDetail.ClientMobile,
    });
    bottomSheetRef.current.closeBottomSheet();
  }

  function declineFunction() {
    Alert.alert(STRING_CONSTANTS.decline_ticket_alert_box) +
      bottomSheetRef.current.closeBottomSheet();
  }

  const renderFooter = () => {
    return null;
  };

  const renderItem = ({item}) => {
    return <TicketItem item={item} Param={Param} />;
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ClientBox
        ClientFName={ClientFName}
        ClientLName={ClientLName}
        ClientEmail={ClientEmail}
        ClientMobile={ClientMobile}
      />
      <Text style={styles.Tittle}>Tickets</Text>
      <TabSelector
        tabs={[
          STRING_CONSTANTS.schedule,
          STRING_CONSTANTS.close,
          STRING_CONSTANTS.suspend,
          STRING_CONSTANTS.decline,
          STRING_CONSTANTS.all,
        ]}
        onSelect={handleTabSelect}
        active={selectedTab}
      />
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
        ) : (
          <View style={styles.nullDataContainer}>
            <Text style={styles.nullDataText}>No Ticket Available</Text>
          </View>
        )}
      </View>

      <GlobalBottomSheet ref={bottomSheetRef}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {(parameter == null || parameter.Status == 1) && (
            <>
              <GlobalButton
                onPress={convertToInvoice}
                text={STRING_CONSTANTS.convert_to_invoice}
                imageSource={require('../../assets/convert.png')}
              />
              <GlobalButton
                onPress={EditTicket}
                text={STRING_CONSTANTS.edit_ticket}
                imageSource={require('../../assets/EditProduct.png')}
              />
            </>
          )}
          {(parameter == null || parameter.Status == 2) && (
            <GlobalButton
              onPress={TicketDetail}
              text={STRING_CONSTANTS.ticket_details}
              imageSource={require('../../assets/view.png')}
            />
          )}
          {(parameter == null || parameter.Status == 5) && (
            <>
              <GlobalButton
                onPress={convertToInvoice}
                text={STRING_CONSTANTS.convert_to_invoice}
                imageSource={require('../../assets/convert.png')}
              />
              <GlobalButton
                onPress={TicketDetail}
                text={STRING_CONSTANTS.ticket_details}
                imageSource={require('../../assets/view.png')}
              />
            </>
          )}
          {(parameter == null || parameter.Status == 3) && (
            <>
              <GlobalButton
                onPress={declineFunction}
                text={STRING_CONSTANTS.convert_to_invoice}
                imageSource={require('../../assets/convert.png')}
              />
              <GlobalButton
                onPress={declineFunction}
                text={STRING_CONSTANTS.ticket_details}
                imageSource={require('../../assets/view.png')}
              />
            </>
          )}
        </View>
      </GlobalBottomSheet>
      <BottomTabBar />
    </SafeAreaView>
  );
};

export default AllTickets_Screen;

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
  container: {
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  Tittle: {
    color: '#000000',
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
