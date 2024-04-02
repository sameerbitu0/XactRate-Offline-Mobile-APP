import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NAVIGATION_STRING_CONSTANTS from '../navigation/NavigarionStringConstants';
import {Logout_Api} from './api/Logout_Api';
import CustomLoadingModal from './CustomLoadingModal';

const BottomTabBar = ({activeTab, setActiveTab}) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const [orientation, setOrientation] = useState('portrait');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      const {width, height} = Dimensions.get('window');
      if (width > height) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };
    const showListenerDimensions = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    const removeListenerDimensions = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );
    return () => {
      removeListenerDimensions.remove();
      showListenerDimensions.remove();
    };
  }, []);

  const tabsIpad = [
    {
      screenName: NAVIGATION_STRING_CONSTANTS.home_screen,
      icon: require('../assets/dashboard.png'),
      text: 'Dashboard',
    },
    {
      screenName: NAVIGATION_STRING_CONSTANTS.schedule_screen,
      icon: require('../assets/tabbar1.png'),
      text: 'Schedule',
    },
    {
      screenName: NAVIGATION_STRING_CONSTANTS.clients_screen,
      icon: require('../assets/tabbar2.png'),
      text: 'Clients',
    },
    {
      screenName: NAVIGATION_STRING_CONSTANTS.ticket_screen,
      icon: require('../assets/invoice.png'),
      text: 'Ticket',
    },
    {
      screenName: NAVIGATION_STRING_CONSTANTS.details_screen,
      icon: require('../assets/tabbar3.png'),
      text: 'All Tickets',
    },
    {
      screenName: 'Logout',
      icon: require('../assets/tabbar4.png'),
      text: 'Logout',
    },
  ];

  const handleTabPress = index => {
    const selectedTab = tabsIpad[index];
    if (selectedTab.screenName === 'Logout') {
      // Show confirmation alert
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'no',
          },
          {text: 'Yes', onPress: () => handleLogout()},
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate(selectedTab.screenName);
    }
  };

  const handleLogout = () => {
    setModalVisible(true);
    Logout_Api(navigation);
    setModalVisible(false);
  };

  return (
    <View>
      <View style={Styles.bottomTabBarContainer}>
        {tabsIpad.map(
          (tab, index) =>
            !(windowWidth <= 700 && (index === 1 || index === 3)) && (
              <TouchableOpacity
                key={index}
                style={Styles.tab}
                onPress={() => handleTabPress(index)}>
                <Image
                  source={tab.icon}
                  style={[
                    Styles.tabIcon,
                    index === activeTab ? Styles.activeTabIcon : null,
                  ]}
                />
                <Text
                  style={[
                    Styles.tabText,
                    index === activeTab ? Styles.activeTabText : null,
                  ]}>
                  {tab.text}
                </Text>
              </TouchableOpacity>
            ),
        )}
        <CustomLoadingModal visible={modalVisible} />
      </View>
    </View>
  );
};

export default BottomTabBar;

const Styles = StyleSheet.create({
  bottomTabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    borderTopWidth: 0.3,
    borderColor: 'gray',
  },

  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  activeTabIcon: {
    tintColor: '#5dbf06',
  },
  tabText: {
    color: '#000',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
  },
  activeTabText: {
    color: '#5dbf06',
    fontFamily: 'DMSans-Bold',
    fontSize: 15,
  },
});
