import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Delete } from 'lucide-react-native'
import colors from '@src/constants/colors'
import { dialPadContent, dialPadTextSize } from '@src/constants/numpad'
import { INumPad } from '@src/@types/components/numberpad'

const NumPad: React.FC<INumPad> = ({ style, updateCash, removeButton }) => {
  const onPress = (item: string) => {
    updateCash(item)
  }
  return (
    <View style={[styles.numPadContainer, style]}>
      {dialPadContent.map((item, index) => {
        // Skip rendering the '.' button if removeButton is true
        if (item === '.' && removeButton) {
          return <View key={index} style={styles.dummyContainer} /> // Returning null skips rendering this item
        }
        return (
          <TouchableOpacity
            key={index}
            delayPressOut={0}
            style={styles.dialPadContainer}
            onPress={() => onPress(item.toString())}>
            {item === 'X' ? (
              <Delete size={25} color={colors.BLACK} />
            ) : (
              <Text
                maxFontSizeMultiplier={1.4}
                style={[{ fontSize: dialPadTextSize }, styles.dialPadText]}>
                {item}
              </Text>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default React.memo(NumPad)
