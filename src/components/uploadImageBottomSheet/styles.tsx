import colors from '@constants/colors';
import { AlignItemType, FontWeight, JustifyContentType } from '@src/@types/enum';
import fontSize from '@src/constants/fontSize';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ////////////////////////////////
  sheetContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 0,
    margin: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentScroll: {
    backgroundColor: colors.WHITE,
    width: '100%',
    padding: 0,
  },
  textTitle: {
    color: colors.BLACK,
    fontSize: fontSize.LARGE,
    fontWeight: FontWeight.W600,
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -35,
    height: 30,
    width: 30,
    backgroundColor: colors.HEADER,
    borderRadius: 15,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  imageButton: {
    flexDirection: 'row',
    justifyContent: JustifyContentType.SpaceBetween,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageButtonText: {
    color: colors.BLACK,
    fontSize: fontSize.TEXT_BASE,
  },
});
