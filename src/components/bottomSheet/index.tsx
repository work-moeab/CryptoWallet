import colors from '@src/constants/colors';
import React, { FC } from 'react';
import { Modal, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import styles from './styles';
import { IBottomSheetProps } from '@src/@types/components/bottomSheet';
import { deviceDimensions } from '@src/helper/helper';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BottomSheet: FC<IBottomSheetProps> = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  children,
  sheetStyle = { height: '70%', backgroundColor: colors.WHITE },
  onClose,
}) => {
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isBottomSheetOpen}
      statusBarTranslucent
      onRequestClose={handleCloseBottomSheet}>
      <AnimatedPressable
        // style={styles.backdrop}
        style={[styles.backdrop, { height: deviceDimensions.height }]}
        testID={'backdrop'}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={(event) => event?.target === event?.currentTarget && handleCloseBottomSheet()}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          // entering={SlideInDown.springify().damping(15)}
          // exiting={SlideOutDown}
          style={[styles.bottomSheet, sheetStyle]}>
          {children}
        </Animated.View>
      </AnimatedPressable>
    </Modal>
  );
};

export default BottomSheet;
