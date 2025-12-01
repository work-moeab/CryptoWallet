import React, { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './style'
import { ICustomCardProps } from '@src/@types/components/card'

const Card: FC<ICustomCardProps> = ({
  children,
  cardStyle = {},
  testID = 'cardView',
  onPress,
  disabled = false,
  activeOpacity = 0.7,
}) => {
  return onPress ? (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      style={[styles.cardContainer, cardStyle]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View testID={testID} style={[styles.cardContainer, cardStyle]}>
      {children}
    </View>
  )
}
export default Card
