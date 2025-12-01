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
  mainContainer: {
    alignSelf: AlignSelfType.Center,
    alignItems: AlignItemType.Center,
    width: '90%',
    display: 'flex',
    marginTop: 40,
    borderRadius: 20,
    paddingBottom: 20,
  },
  imgInnerBorder: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    top: -40,
    borderWidth: 4,
    borderRadius: 60,
    borderColor: colors.HEADER,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  text: {
    top: -30,
    fontSize: fontSize.XXL,
    color: colors.BLACK,
    fontWeight: FontWeight.W800,
  },
  textMobNum: {
    top: -30,
    color: colors.DARK_GREY,
    fontSize: fontSize.LARGE,
    fontWeight: FontWeight.W400,
  },
  qrContainer: {
    alignSelf: AlignSelfType.Center,
  },
  retryContainer: {
    height: 200,
    width: '100%',
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
  actionsButtons: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
  button: {
    height: 40,
    width: '45%',
    borderRadius: 20,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
    backgroundColor: colors.HEADER,
  },
  iconContainer: {
    position: 'absolute',
  },
  buttonText: {
    fontSize: fontSize.LARGE,
    fontWeight: FontWeight.W800,
  },
  kycText: {
    color: colors.BLACK,
    fontSize: fontSize.XXXL,
    fontWeight: FontWeight.W600,
    textAlign: TextAlignType.Center,
  },
})
