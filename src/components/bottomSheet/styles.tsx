import colors from '@constants/colors';
import { AlignItemType, JustifyContentType } from '@src/@types/enum';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  bottomSheet: {
    position: 'absolute',
    left: 10,
    right: 10,
    justifyContent: JustifyContentType.FlexStart,
    alignItems: AlignItemType.Center,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 23,
    bottom: 0,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    zIndex: 110,
    maxHeight: '100%',
    elevation: 9,
  },
  pressableContainer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  sheet: {
    backgroundColor: colors.WHITE,
    padding: 16,
    width: '100%',
    position: 'absolute',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 999,
    paddingVertical: 23,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    flex: 1,
    height: '100%',
  },
});
