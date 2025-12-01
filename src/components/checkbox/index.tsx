import React, { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './styles'
import { Check, Circle } from 'lucide-react-native'
import colors from '@src/constants/colors'

const Checkbox: FC<ICheckboxProps> = ({ value, setValue, testID = 'check', square = false }) => {
  return (
    <View style={styles.checkboxContainer}>
      {square ? (
        <TouchableOpacity
          style={styles.squareCheckbox}
          testID={testID}
          onPress={() => setValue(!value)}
          activeOpacity={0.7}>
          {value ? <Check size={18} color={colors.HEADER} /> : <></>}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.checkbox}
          testID={testID}
          onPress={() => setValue(!value)}
          activeOpacity={0.7}>
          {value ? (
            <Circle size={20} color={colors.HEADER} fill={colors.HEADER} />
          ) : (
            <Circle size={20} color={colors.HEADER} />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Checkbox
