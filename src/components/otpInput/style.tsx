import { FontWeight, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    paddingHorizontal: '10%',
  },
  container: {},
  errorText: {
    marginTop: 20,
    fontSize: fontSize.LARGE,
    textAlign: TextAlignType.Center,
    color: colors.RED,
    fontWeight: FontWeight.W600,
  },
  pinCodeContainer: {
    backgroundColor: colors.TRANSPARENT,
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  pinCodeText: {
    color: colors.BLACK,
    fontSize: fontSize.LARGE,
    fontWeight: FontWeight.W400,
  },
})

export default styles
