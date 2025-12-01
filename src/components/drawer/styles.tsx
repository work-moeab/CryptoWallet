import {
  AlignItemType,
  AlignSelfType,
  FontWeight,
  JustifyContentType,
  TextAlignType,
} from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  profileContainer: { alignSelf: AlignSelfType.Center },
  imgBorder: {
    width: 120,
    height: 120,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    alignSelf: AlignSelfType.Center,
    borderColor: colors.HEADER,
  },
  imgInnerBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderRadius: 60,
    borderColor: colors.HEADER,
  },
  userName: {
    textAlign: TextAlignType.Center,
    fontSize: fontSize.LARGE,
    marginTop: 12,
    color: colors.BLACK,
    fontWeight: FontWeight.W500,
  },
  userEmail: { fontSize: fontSize.TEXT_BASE, color: colors.BLACK, alignSelf: AlignSelfType.Center },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    marginHorizontal: '5%',
    marginTop: 10,
  },
  balance: { fontSize: fontSize.TEXT_BASE, color: colors.BLACK },
  share: { flexDirection: 'row', gap: 2 },
  imggroup: { width: 25, height: 25 },
  tellfriend: {
    fontSize: fontSize.TEXT_BASE,
    color: colors.HEADER,
    alignSelf: AlignSelfType.Center,
    marginLeft: 3,
  },
  listContainer: { marginTop: 15, height: '50%' },
  label: {
    fontSize: 14,
    color: colors.BLACK,
  },
  sperator: {
    height: 1,
    width: '90%',
    backgroundColor: colors.GREY,
    alignSelf: AlignSelfType.Center,
    marginTop: -3,
  },
  social: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: JustifyContentType.Center,
    marginBottom: 20,
    gap: 40,
  },
})
