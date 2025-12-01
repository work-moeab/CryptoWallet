import { FontWeight, TextAlignType } from '@src/@types/enum'
import { StyleSheet } from 'react-native'

import colors from '../../constants/colors'

export default StyleSheet.create({
  img: { width: 22, height: 22 },
  logoText: { width: 45, height: 25 },
  headerTextStyle: {
    textAlign: TextAlignType.Center,
    color: colors.WHITE,
    fontWeight: FontWeight.Bold,
    fontSize: 16,
  },
  drawerItemStyle: {
    marginVertical: 1,
  },
  headerStyle: { backgroundColor: colors.HEADER },
  drawerLabelStyle: { fontSize: 12, color: colors.BLACK },
})
