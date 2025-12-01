import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Circle } from 'lucide-react-native'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { AlignItemType } from '@src/@types/enum'
import { IRadioButtonProps } from '@src/@types/components/radioButton'

const RadioButton = ({ containerStyle, data, selected, onPress }: IRadioButtonProps) => {
  return (
    <View style={{ ...containerStyle, ...styles.mainContainer }}>
      {data.map((item, index) => (
        <View key={index} style={styles.section}>
          <TouchableOpacity
            style={styles.imageContainer}
            activeOpacity={0.7}
            onPress={() => onPress(item)}
            testID={item.value}>
            {selected === item.id ? (
              <Circle size={20} color={colors.HEADER} fill={colors.HEADER} />
            ) : (
              <Circle size={20} color={colors.HEADER} />
            )}
            <Text
              maxFontSizeMultiplier={1.4}
              numberOfLines={2}
              style={selected === item.id ? [styles.itemText] : styles.itemText}>
              {item.value}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default RadioButton

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  section: {
    width: '100%',
    marginVertical: 7,
    marginLeft: 7,
    backgroundColor: colors.HEADER,
    borderRadius: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: AlignItemType.Center,
    backgroundColor: colors.WHITE,
    margin: 0,
    width: '100%',
    height: 'auto',
  },
  itemText: {
    fontSize: fontSize.LARGE,
    color: colors.GREY,
    marginHorizontal: 15,
  },
})
