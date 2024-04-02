import React, { useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const GlobalBottomSheet = React.forwardRef(({ children }, ref) => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  React.useImperativeHandle(ref, () => ({
    openBottomSheet,
    closeBottomSheet
  }));

  return (
    <RBSheet ref={bottomSheetRef}>
      {children}
    </RBSheet>
  );
});

export default GlobalBottomSheet;
