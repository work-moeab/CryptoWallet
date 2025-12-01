import { AlignItemType, AlignSelfType, FontWeight, JustifyContentType } from '@src/@types/enum';
import colors from '@src/constants/colors';
import fontSize from '@src/constants/fontSize';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  innerContainer: {
    padding: 15,
    height: 'auto',
    paddingBottom: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.LIGHTEST_GREY,
    backgroundColor: colors.WHITE,
    marginTop: '-10%',
    zIndex: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    shadowColor: colors.BLACK,
    elevation: 10,
  },
  profileContainer: {
    gap: 10,
    alignSelf: AlignSelfType.Center,
    width: '90%',
  },
  imgBorder: {
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    alignSelf: AlignSelfType.Center,
    zIndex: 3,
    elevation: 1,
  },
  imgInnerBorder: {
    width: 115,
    height: 115,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderRadius: 60,
    borderColor: colors.HEADER,
  },
  imggroup: {
    width: 22,
    height: 22,
  },
  textContainer: {
    marginTop: '10%',
    alignItems: AlignItemType.Center,
    alignSelf: AlignSelfType.Center,
    marginBottom: '5%',
    gap: 15,
  },
  underlineTextContainer: {
    gap: 3,
    alignItems: AlignItemType.Center,
  },
  text: {
    color: colors.BLACK,
    fontSize: fontSize.LARGE,
    fontWeight: FontWeight.W500,
  },
  underline: {
    height: 1,
    width: 60,
    backgroundColor: colors.HEADER,
    alignSelf: AlignSelfType.Stretch,
  },
  buttonContainer: {
    marginTop: -30,
    width: '100%',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    position: 'relative',
    elevation: 1,
    zIndex: 10,
  },
});
