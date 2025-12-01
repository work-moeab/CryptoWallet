import { AlignItemType, FontWeight, JustifyContentType, TextAlignType } from '@src/@types/enum';
import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 12,
    color: colors.BLACK,
    fontWeight: FontWeight.Bold,
    textAlign: TextAlignType.Center,
  },
  description: {
    fontSize: 12,
    color: colors.BLACK,
    marginTop: 8,
    fontWeight: FontWeight.W500,
    textAlign: TextAlignType.Center,
  },
  bottomSheet: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    width: '92%',
    padding: 20,
    paddingBottom: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  pressableContainer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
    height: '100%',
    flex: 1,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    position: 'relative',
    elevation: 1,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
});

export default styles;
