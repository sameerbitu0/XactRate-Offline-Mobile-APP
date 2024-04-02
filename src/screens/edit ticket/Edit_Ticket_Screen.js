import React, {useState, useRef} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
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
import GlobalBottomSheet from './components/GlobalBottomSheet';
import ClientPickerButton from './components/ClientPickerButton';
import Clients_Api from '../../Components/api/Clients_Api';
import Tickets_Type_Api from '../../Components/api/Tickets_Type_Api';
import ClientList from './components/ClientList';
import TicketTypeList from './components/TicketTypeList';
import CustomDatePicker from './components/CustomDatePicker';
import CommitTextInput from './components/CommitTextInput';
import CustomButton from './components/CustomButton';
import Create_Ticket_Api from '../../Components/api/Create_Ticket_Api';
import CustomLoadingModal from '../../Components/CustomLoadingModal';
import NAVIGATION_STRING_CONSTANTS from '../../navigation/NavigarionStringConstants';
import CustomButtonRemove from './components/CustomButtonRemove';
import Remove_Ticket_Api from '../../Components/api/Remove_Ticket_Api';
import BackButtonHandler from '../../Components/BackButtonHandler';
import {checkInternetConnectivity} from '../../Components/api/checkInternetConnectivity';

const Edit_Ticket_Screen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const route = useRoute();
  const {
    _Id,
    Client_Id,
    Ticket_TypeId,
    Ticket_Date,
    Client_FName,
    Client_LName,
    Ticket_TypeName,
    TicketNotes,
    ClientEmail,
    ClientMobile,
    index,
  } = route.params ?? {};
  const windowWidth = Dimensions.get('window').width;
  const [dataState, setDataState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  // client name fetch
  const [clientNameData, setClientNameData] = useState([]);
  const [client, setClient] = useState({
    client_id: null,
    client_name: null,
    client: false,
  });
  const [ticketTypeData, setTicketTypeData] = useState([]);
  const [ticketType, setTicketType] = useState({
    id: null,
    ticket_type_id: null,
    ticket_type_name: null,
    ticket: false,
  });
  const [date, setDate] = useState();
  const [ticketNotes, setTicketNotes] = useState('');

  const fetchData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const clients = await Clients_Api(userToken);
      const Tickets = await Tickets_Type_Api(userToken);
      setDataState(clients);
      setClientNameData(clients);
      setTicketTypeData(Tickets);
      setError('');
    } catch (error) {
      setError('Error fetching schedule data');
    } finally {
      setLoading(false);
    }
  };
  const onScreenLoad = () => {
    setClient(prevClient => ({
      ...prevClient,
      client_id: Client_Id,
      client_name: Client_FName + ' ' + Client_LName,
    }));
    setTicketType(prevClient => ({
      ...prevClient,
      id: _Id,
      ticket_type_id: Ticket_TypeId,
      ticket_type_name: Ticket_TypeName,
    }));
    setDate(Ticket_Date);
    setTicketNotes(TicketNotes);
  };
  const handleBackPress = () => {
    navigation.goBack();
  };
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      onScreenLoad();
      fetchData();
    }, []),
  );

  function openSheet(value) {
    if (value == 'client') {
      setTicketType(prevClient => ({
        ...prevClient,
        ticket: false,
      }));
      setClient(prevClient => ({
        ...prevClient,
        client: true,
      }));
      bottomSheetRef.current.openBottomSheet();
    } else {
      setClient(prevClient => ({
        ...prevClient,
        client: false,
      }));
      setTicketType(prevClient => ({
        ...prevClient,
        ticket: true,
      }));
      bottomSheetRef.current.openBottomSheet();
    }
  }

  function selectClientName(item) {
    setClient(prevClient => ({
      ...prevClient,
      client_id: item.id,
      client_name: item.fname + ' ' + item.lname,
    }));
    bottomSheetRef.current.closeBottomSheet();
  }

  function selectTicketType(item) {
    setTicketType(prevClient => ({
      ...prevClient,
      ticket_type_id: item.id,
      ticket_type_name: item.des,
    }));
    bottomSheetRef.current.closeBottomSheet();
  }

  const updateDate = date => {
    var separator = '-';
    var _d =
      date.getFullYear() +
      separator +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      separator +
      date.getDate().toString().padStart(2, '0');
    setDate(_d);
  };

  function removeHandle() {
    Alert.alert(
      STRING_CONSTANTS.default_alert_box_tittle,
      STRING_CONSTANTS.delete_ticket_alert_box,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => removeTicket()},
      ],
    );
  }

  const removeTicket = async () => {
    const isConnected = await checkInternetConnectivity();
    const userToken = await AsyncStorage.getItem('userToken');
    var id = _Id;
    if (isConnected) {
      try {
        setModalVisible(true);
        const ticketRempve = await Remove_Ticket_Api(userToken, id, index);
        if (ticketRempve) {
          navigation.navigate('Root', {
            screen: NAVIGATION_STRING_CONSTANTS.details_screen,
          });
          setModalVisible(false);
        }
      } catch (error) {
        setError('Error fetching schedule data');
      } finally {
        setModalVisible(false);
      }
    } else {
      if (_Id) {
        alert('Only offline tickets will be deleted without internet.');
      } else {
        try {
          setModalVisible(true);
          const ticketRempve = await Remove_Ticket_Api(userToken, id, index);
          if (ticketRempve) {
            navigation.navigate('Root', {
              screen: NAVIGATION_STRING_CONSTANTS.details_screen,
            });
            setModalVisible(false);
          }
        } catch (error) {
          setError('Error fetching schedule data');
        } finally {
          setModalVisible(false);
        }
      }
    }
  };

  const Submit = async () => {
    if (!client.client_id) {
      console.warn(STRING_CONSTANTS.client_required);
    } else if (!ticketType.ticket_type_id) {
      console.warn(STRING_CONSTANTS.ticket_type_required);
    } else if (!date || date == '') {
      console.warn('Please Select Date');
    } else {
      try {
        setModalVisible(true);
        var postData = {
          id: ticketType.id,
          client_id: client.client_id,
          ticket_type_id: ticketType.ticket_type_id,
          date: date,
          ticket_notes: ticketNotes,
          formType: 'update',
        };
        const userToken = await AsyncStorage.getItem('userToken');
        const ticket = await Create_Ticket_Api(userToken, postData);
        if (ticket) {
          navigation.navigate('Root', {
            screen: NAVIGATION_STRING_CONSTANTS.details_screen,
          });
          setModalVisible(false);
        }
      } catch (error) {
        setError('Error fetching schedule data');
      } finally {
        setModalVisible(false);
      }
    }
  };

  async function checkConnectivity() {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      Submit();
    } else {
      alert("user can't edit the ticket without internet");
    }
  }

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
          <ScrollView>
            <Text style={styles.TittleScreen}>Edit Ticket</Text>
            <ClientPickerButton
              onPress={() => openSheet('client')}
              tittle={client.client_name ? client.client_name : 'Select'}
              label={STRING_CONSTANTS.select_client_bottom_sheet_title}
            />
            <ClientPickerButton
              onPress={openSheet}
              tittle={
                ticketType.ticket_type_name
                  ? ticketType.ticket_type_name
                  : 'Select'
              }
              label={STRING_CONSTANTS.select_ticket_button_title}
            />
            <CustomDatePicker label={'Date'} date={date} setDate={updateDate} />
            <CommitTextInput
              placeholder="Note"
              placeholderTextColor="#999999"
              value={ticketNotes}
              onChangeText={text => {
                setTicketNotes(text);
              }}
              style={{marginTop: 20, paddingHorizontal: 10}}
            />
            <CustomButtonRemove
              onPress={removeHandle}
              title={STRING_CONSTANTS.delete_ticket}
            />
            <CustomButton
              color={'#5DBF06'}
              onPress={checkConnectivity}
              title={STRING_CONSTANTS.save_ticket}
            />
            <CustomButton
              color={'#D65F1C'}
              onPress={() => navigation.goBack()}
              title={STRING_CONSTANTS.cancel_button_label}
            />
          </ScrollView>
        ) : (
          <View style={styles.nullDataContainer}>
            <Text style={styles.nullDataText}>
              {STRING_CONSTANTS.null_screen_data_string}
            </Text>
          </View>
        )}
      </View>
      <CustomLoadingModal visible={modalVisible} />
      <GlobalBottomSheet
        ref={bottomSheetRef}
        height={client.client == true ? 450 : windowWidth > 700 ? 750 : 600}>
        {client.client == true && (
          <ClientList
            data={clientNameData}
            selectClientName={selectClientName}
          />
        )}
        {ticketType.ticket == true && (
          <TicketTypeList
            data={ticketTypeData}
            onSelectTicketType={selectTicketType}
          />
        )}
      </GlobalBottomSheet>
      <BottomTabBar />
      <BackButtonHandler onBackPress={handleBackPress} />
    </SafeAreaView>
  );
};

export default Edit_Ticket_Screen;

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
  TittleScreen: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
});
