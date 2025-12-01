import colors from '@constants/colors'
import { AlignItemType,  FontWeight, } from '@src/@types/enum'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: AlignItemType.Center,
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  cardContainerStyle: {
    marginTop: 10,
    alignItems: AlignItemType.Center,
    width: '100%',
    marginBottom: 60,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    alignItems: AlignItemType.Center,
    gap: 15,
    marginBottom: 35,
  },
  error: {
    color: colors.RED,
    fontWeight: FontWeight.W400,
    paddingBottom: 10,
  },

})
