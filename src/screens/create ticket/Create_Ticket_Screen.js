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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import BackButtonHandler from '../../Components/BackButtonHandler';

const Create_Ticket_Screen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const windowWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  // client name fetch
  const [clientNameData, setClientNameData] = useState([]);
  const [client, setClient] = useState({
    client_id: null,
    client_fname: null,
    client_lname: null,
    client_phone_no_1: null,
    client_email: null,
    client: false,
  });
  const [ticketTypeData, setTicketTypeData] = useState([]);
  const [ticketType, setTicketType] = useState({
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
      setClientNameData(clients);
      setTicketTypeData(Tickets);
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      updateDate(new Date());
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
      client_fname: item.fname,
      client_lname: item.lname,
      client_phone_no_1: item.phone_no_1,
      client_email: item.email,
    }));
    setError('');
    bottomSheetRef.current.closeBottomSheet();
  }

  function selectTicketType(item) {
    setTicketType(prevClient => ({
      ...prevClient,
      ticket_type_id: item.id,
      ticket_type_name: item.des,
    }));
    setError('');
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

  const Submit = async () => {
    if (!client.client_id) {
      setError(STRING_CONSTANTS.client_required);
    } else if (!ticketType.ticket_type_id) {
      setError(STRING_CONSTANTS.ticket_type_required);
    } else if (!date || date == '') {
      setError('Please Select Date');
    } else {
      try {
        setModalVisible(true);
        var postData = {
          client_id: client.client_id,
          ticket_type_id: ticketType.ticket_type_id,
          date: date,
          ticket_notes: ticketNotes,
          formType: 'save',
        };
        var offnlinePostData = {
          id: null,
          first_name: client.client_fname || null,
          last_name: client.client_lname || null,
          ticket_type_description: ticketType.ticket_type_name || null,
          client_id: client.client_id || null,
          ticket_type_id: ticketType.ticket_type_id || null,
          email: client.client_email,
          phone_no_1: client.client_phone_no_1,
          date: date || null,
          ticket_notes: ticketNotes || null,
          status: '1' || null,
          formType: 'save' || null,
        };
        const userToken = await AsyncStorage.getItem('userToken');
        const ticket = await Create_Ticket_Api(
          userToken,
          postData,
          offnlinePostData,
        );
        if (ticket) {
          navigation.navigate('Root', {
            screen: NAVIGATION_STRING_CONSTANTS.details_screen,
          });
          setModalVisible(false);
        }
      } catch (error) {
        alert('Error fetching schedule data');
      } finally {
        setModalVisible(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={{flex: 1}}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={40} color="#7ed321" />
          </View>
        ) : (
          <ScrollView>
            <Text style={styles.TittleScreen}>
              {STRING_CONSTANTS.create_ticket_title}
            </Text>
            <ClientPickerButton
              onPress={() => openSheet('client')}
              tittle={
                client.client_fname
                  ? client.client_fname + ' ' + client.client_lname
                  : 'Select'
              }
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
            {error && (
              <Text
                style={{
                  marginVertical: 10,
                  color: 'red',
                  textAlign: 'center',
                  fontFamily: 'DMSans-Medium',
                  fontSize: 15,
                }}>
                {error}
              </Text>
            )}
            <CustomButton
              color={'#5DBF06'}
              onPress={Submit}
              title={STRING_CONSTANTS.create_ticket_button_label}
            />
            <CustomButton
              color={'#D65F1C'}
              onPress={() => navigation.goBack()}
              title={STRING_CONSTANTS.cancel_button_label}
            />
          </ScrollView>
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

export default Create_Ticket_Screen;

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
