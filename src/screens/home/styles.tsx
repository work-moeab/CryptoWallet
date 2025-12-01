import { AlignItemType, FontWeight, JustifyContentType, TextAlignType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  availableBalancecardContainer: {
    paddingHorizontal: 14,
  },
  cardContainer: {
    padding: 15,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: 20,
    justifyContent: JustifyContentType.SpaceBetween,
  },
  image: {
    height: 75,
    width: 80,
  },
  cardStyle: {
    padding: 15,
    width: '45%',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  text: {
    textAlign: TextAlignType.Center,
    color: colors.TEXT_COLOR,
    fontWeight: FontWeight.W500,
  },
})
