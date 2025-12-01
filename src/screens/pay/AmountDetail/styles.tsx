import { AlignItemType, FontWeight, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  availableBalancecardContainer: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    gap: 20,
  },
  buttonTextStyle: { fontSize: 16, color: colors.BLACK },
  cardView: {
    width: '100%',
    alignItems: AlignItemType.Center,
  },
  cardStyle: {
    padding: 15,
    gap: 24,
    width: '90%',
    marginBottom: 30,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: FontWeight.W700,
    color: colors.BLACK,
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    alignItems: AlignItemType.Center,
    marginTop: 20,
  },
  error: {
    color: colors.RED,
    fontWeight: FontWeight.W400,
    marginHorizontal: 6.1,
  },
})
