import { ICustomButtonProps } from '@src/@types/components/button'
import loader from '@src/assets/loader'
import styles from '@src/components/button/style'
import LottieView from 'lottie-react-native'
import React, { FC } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const CustomButton: FC<ICustomButtonProps> = ({
  title,
  loadingMessage = 'Loading',
  isLoading = false,
  onPress,
  buttonStyle = {},
  textStyle = {},
  disabled = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      testID={'button'}
      disabled={disabled}
      style={{
        ...styles.button,
        ...buttonStyle,
      }}
      onPress={onPress}
      {...rest}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView autoPlay style={styles.loader} source={loader.LOADER_JSON} />
        </View>
      ) : (
        <>
          {title && (
            <View style={styles.titleContainer}>
              <Text
                maxFontSizeMultiplier={1.4}
                testID="titleText"
                style={{
                  ...styles.text,
                  ...textStyle,
                }}>
                {isLoading ? loadingMessage : title}
              </Text>
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
