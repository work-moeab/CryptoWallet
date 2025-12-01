import {
  AlignItemType,
  AlignSelfType,
  FontWeight,
  JustifyContentType,
  TextAlignType,
} from '@src/@types/enum';
import colors from '@src/constants/colors';
import fontSize from '@src/constants/fontSize';
import { deviceDimensions } from '@src/helper/helper';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: AlignItemType.Center,
    marginTop: 20,
  },
  cardStyle: {
    padding: 4,
    width: '90%',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    shadowColor: colors.BLACK,
    elevation: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: fontSize.TEXT_BASE,
    fontWeight: FontWeight.W700,
    color: colors.BLACK,
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    alignItems: AlignItemType.Center,
    marginTop: 8,
    marginBottom: 8,
  },
  error: {
    textAlign: TextAlignType.Center,
    fontSize: fontSize.MEDIUM,
    fontWeight: FontWeight.W400,
    color: colors.HEADER,
  },
  loaderContainer: {
    height: 120,
    width: '100%',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  loader: {
    width: 60,
    height: 60,
    alignSelf: AlignSelfType.Center,
    backgroundColor: colors.LOADER_BACKGOUND,
  },
  scannerContainer: {
    marginTop: 10,
    height: deviceDimensions.height / 1.4,
    width: deviceDimensions.width - 30,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
    borderRadius: 5,
    borderWidth: 0.4,
    borderColor: colors.BLACK,
    overflow: 'hidden',
  },
  scanner: {
    zIndex: 1,
    height: deviceDimensions.height / 2,
    width: 320,
    backgroundColor: colors.LOADER_BACKGOUND,
  },
  scannerTopContent: {},
  scannerBottomContent: {},
  scannerButton: {
    backgroundColor: colors.HEADER,
    width: 90,
    alignSelf: AlignSelfType.Center,
    height: 90,
    borderRadius: 5,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  modal: {
    margin: 0,
  },
  modalView: {
    height: '30%',
    marginTop: 'auto',
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalClose: {
    alignSelf: AlignSelfType.FlexEnd,
    marginRight: 10,
    marginTop: 10,
  },
  home: { width: 30, height: 30 },
  nfcSheetContainer: {
    alignItems: AlignItemType.Center,
    width: '100%',
  },
});
