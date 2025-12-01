import colors from '@src/constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.APP_BACKGROUND,
  },
  linearGradient: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 22,
  },
});
