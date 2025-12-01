import colors from '@src/constants/colors'
import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'

import styles from './style'
import { IOTPInputProps } from '@src/@types/components/otp'

const CustomOTPInput: FC<IOTPInputProps> = ({
  error,
  setValue,
  otpRef,
  marginTop = 0,
  marginBottom = 0,
  onTextChange,
  testID = 'otpView',
}) => {
  const handleText = (text: string) => {
    setValue(text)
  }
  return (
    <View testID={testID} style={{ ...styles.viewContainer, marginTop, marginBottom }}>
      <OtpInput
        numberOfDigits={4}
        focusColor={error ? colors.RED : colors.BLACK}
        focusStickBlinkingDuration={500}
        onFilled={(text) => handleText(text)}
        onTextChange={onTextChange}
        ref={otpRef}
        textInputProps={{
          maxFontSizeMultiplier: 1.4,
        }}
        textProps={{
          maxFontSizeMultiplier: 1.4,
        }}
        theme={{
          containerStyle: styles.container,
          focusStickStyle: { backgroundColor: colors.WHITE },
          focusedPinCodeContainerStyle: {
            backgroundColor: error ? colors.RED : colors.BUTTON,
          },
          pinCodeContainerStyle: {
            ...styles.pinCodeContainer,
            borderColor: error ? colors.RED : colors.BLACK,
          },
          pinCodeTextStyle: styles.pinCodeText,
        }}
      />

      <Text maxFontSizeMultiplier={1.4} style={styles.errorText}>
        {error ? error : ''}
      </Text>
    </View>
  )
}

export default CustomOTPInput
