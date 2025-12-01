import { AlignItemType, FontWeight } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input: {
    fontSize: fontSize.LARGE,
    color: colors.BLACK,
  },
  mainContainer: {},
  flexViewContainer: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    alignItems: AlignItemType.Center,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: colors.BLACK,
    paddingHorizontal: 6,
  },
  currencyText: { color: colors.BLACK, fontSize: fontSize.TEXT_BASE, fontWeight: FontWeight.W600 },
})

export default styles
