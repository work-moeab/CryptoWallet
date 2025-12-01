import React, { FC } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/store'
import { ICurrencyTextInput } from '@src/@types/components/currencyInput'

const CurrencyTextInput: FC<ICurrencyTextInput> = ({
  containerViewStyle = {},
  internalFlexViewContainer = {},
  value = '',
  onPress,
  disabled = false,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.user)

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{ ...styles.mainContainer, ...containerViewStyle }}>
      <View style={{ ...styles.flexViewContainer, ...internalFlexViewContainer }}>
        <Text maxFontSizeMultiplier={1.4} style={styles.currencyText}>
          {userInfo.currency}{' '}
        </Text>
        <Text maxFontSizeMultiplier={1.4} style={styles.input}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CurrencyTextInput
