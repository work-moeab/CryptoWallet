import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { FontWeight } from '@src/@types/enum'

const TextBlinking = ({ cash, inputIndex, currency }: ITextBlinkingProps) => {
  const beforeCaret = cash.slice(0, inputIndex)
  const afterCaret = cash.slice(inputIndex)
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: 400 }),
      -1,
      true, // reverse direction
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View style={styles.input}>
      <Text maxFontSizeMultiplier={1.4} style={styles.cash}>
        {`${currency} `}
      </Text>
      <Text maxFontSizeMultiplier={1.4} style={styles.cash}>
        {beforeCaret}
      </Text>
      <Animated.Text
        style={[styles.cash, { fontWeight: FontWeight.W300 }, animatedStyle]}
        maxFontSizeMultiplier={1.4}>
        |
      </Animated.Text>
      <Text maxFontSizeMultiplier={1.4} style={styles.cash}>
        {afterCaret}
      </Text>
    </View>
  )
}

export default TextBlinking
