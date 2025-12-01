import { AlignItemType, JustifyContentType, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    borderColor: colors.CARD,
    backgroundColor: colors.WHITE,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    elevation: 6,
    width: '90%',
    height: 'auto',
    borderRadius: 20,
  },
  innerContainer: {
    padding: 17,
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    alignItems: AlignItemType.Center,
  },
  scrollContent: { alignItems: AlignItemType.Center, gap: 20, flexGrow: 1, marginVertical: '4%' },
  scrollContainer: {},
  textStyle: {
    fontSize: fontSize.LARGE,
    color: colors.BLACK,
  },
  textContainer: {
    width: '80%',
  },
  subText: {
    fontSize: fontSize.MEDIUM,
    color: colors.BLACK,
  },
  versionText: {
    padding: 20,
    fontSize: fontSize.LARGE,
    textAlign: TextAlignType.Center,
    color: colors.DROP_DOWN_PICKER_TEXT,
  },
})
