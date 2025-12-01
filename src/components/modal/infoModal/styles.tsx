import { FontWeight, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.TEXT_BASE,
    color: colors.BLACK,
    fontWeight: FontWeight.Bold,
    textAlign: TextAlignType.Center,
  },
  description: {
    fontSize: fontSize.TEXT_BASE,
    color: colors.GREY,
    marginTop: 8,
    fontWeight: FontWeight.W500,
    textAlign: TextAlignType.Center,
  },
  buttonTextStyle: {
    fontWeight: FontWeight.W500,
    fontSize: fontSize.LARGE,
    color: colors.WHITE,
  },
  loader: {
    width: 150,
    height: 150,
  },
})

export default styles
