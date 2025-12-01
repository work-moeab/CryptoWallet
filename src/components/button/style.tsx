import { AlignItemType, FontWeight, JustifyContentType, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: JustifyContentType.Center,
  },
  loaderContainer: {
    width: '100%',
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
  loader: {
    width: 40,
    height: 40,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: colors.TRANSPARENT,
    backgroundColor: colors.TRANSPARENT,
  },
  text: {
    color: colors.WHITE,
    fontSize: fontSize.LARGE,
    fontWeight: FontWeight.W400,
    textAlign: TextAlignType.Center,
  },
})

export default styles
