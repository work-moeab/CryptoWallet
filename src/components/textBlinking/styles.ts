import { AlignSelfType, FontWeight, JustifyContentType, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { deviceDimensions } from '@src/helper/helper'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input: {
    justifyContent: JustifyContentType.Center,
    alignSelf: AlignSelfType.Center,
    width: '70%',
    height: deviceDimensions.height * 0.07,
    backgroundColor: colors.APP_BACKGROUND,
    flexDirection: 'row',
  },
  cash: {
    color: colors.BLACK,
    fontSize: fontSize.XXXL,
    fontWeight: FontWeight.W500,
    textAlign: TextAlignType.Center,
  },
  blinkingCaret: {
    fontSize: fontSize.XXXL,
    fontWeight: FontWeight.W300,
  },
})

export default styles
