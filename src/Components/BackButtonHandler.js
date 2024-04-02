import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';

const BackButtonHandler = ({onBackPress}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (onBackPress) {
          onBackPress();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [onBackPress]);

  return null;
};

export default BackButtonHandler;
