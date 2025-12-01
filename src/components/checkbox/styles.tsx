import { AlignItemType, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  checkboxContainer: { height: 20 },
  squareCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: colors.HEADER,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  checkbox: {
    width: 20,
    overflow: 'hidden',
    height: 24,
    justifyContent: JustifyContentType.FlexStart,
    alignItems: AlignItemType.FlexStart,
  },
  checkboxImg: { width: '100%', height: 18 },
})

export default styles
