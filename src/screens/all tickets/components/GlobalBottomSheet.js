import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const GlobalBottomSheet = React.forwardRef(({children}, ref) => {
  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  React.useImperativeHandle(ref, () => ({
    openBottomSheet,
    closeBottomSheet,
  }));

  return (
    <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={250}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      {children}
    </RBSheet>
  );
});

export default GlobalBottomSheet;
