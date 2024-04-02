import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';

const CustomLoadingModal = ({visible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#5dbf06" />
      </View>
    </Modal>
  );
};

export default CustomLoadingModal;
