import CustomButton from '@src/components/button';
import CustomModal from '@src/components/modal/index';
import { buttonStyle } from '@src/constants/buttonStyles';
import { handleModalClose } from '@src/helper/helper';
import React, { FC } from 'react';
import { Text } from 'react-native';

import styles from './styles';
import LottieView from 'lottie-react-native';
import loader from '@src/assets/loader';
import { Modals } from '@src/@types/enum';
import { useDispatch } from 'react-redux';
import { clearTimeoutByKey, createTimeout } from '@src/helper/timeoutUtils';
import { IInfoModal } from '@src/@types/components/modal';
import { TIMEOUT } from '@src/constants/timeout';

const CustomInfoModal: FC<IInfoModal> = ({
  visible,
  setVisible,
  title,
  message,
  isSuccess,
  buttonText = 'Back',
  backButton,
  buttonContainerSyle = buttonStyle.FILLED_ROUND(200, 20),
}) => {
  const dispatch = useDispatch();

  const onAnimationEnd = () => {
    createTimeout(
      TIMEOUT.modalTimeout,
      () => {
        handleModalClose(Modals.PaymentModal, dispatch);
        handleModalClose(Modals.InfoModal, dispatch);
        if (backButton) backButton();
      },
      3000
    );
    return () => clearTimeoutByKey(TIMEOUT.modalTimeout);
  };
  return (
    <CustomModal visible={visible}>
      <Text maxFontSizeMultiplier={1.4} style={styles.title}>
        {title}
      </Text>
      {message && (
        <Text maxFontSizeMultiplier={1.4} style={styles.description}>
          {message}
        </Text>
      )}
      {isSuccess && (
        <LottieView
          style={styles.loader}
          source={loader.SUCCESS}
          autoPlay
          loop={false}
          onAnimationFinish={onAnimationEnd}
        />
      )}
      <CustomButton
        title={buttonText}
        testID="buttons/back"
        onPress={() => {
          backButton?.();
          setVisible();
        }}
        activeOpacity={0.7}
        buttonStyle={buttonContainerSyle}
        textStyle={styles.buttonTextStyle}
      />
    </CustomModal>
  );
};

export default CustomInfoModal;
