import { AlignItemType, AlignSelfType, FontWeight, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {},
  inputText: {
    fontSize: fontSize.LARGE,
    color: colors.BLACK,
  },
  flagMainContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderColor: colors.TEXT_INPUT_BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: colors.WHITE,
    overflow: 'hidden',
  },
  flagInputContainer: {
    flexDirection: 'row',
    width: '45%',
    height: '100%',
    alignItems: AlignItemType.Center,
  },

  flagIconContainer: {
    flexDirection: 'row',
    alignItems: AlignItemType.Center,
    width: '100%',
    justifyContent: JustifyContentType.SpaceEvenly,
  },
  flagIcon: { height: 30, width: 30 },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: '100%',
    fontSize: fontSize.TEXT_BASE,
    color: colors.BLACK,
    borderRadius: 10,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  input2: {
    height: 50,
    fontSize: fontSize.TEXT_BASE,
    color: colors.BLACK,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: colors.TEXT_INPUT_BORDER_COLOR,
    textAlignVertical: 'center',
    marginTop: 14,
  },

  passwordContainer: {
    flexDirection: 'row',
  },
  eye: {
    position: 'absolute',
    top: 15,
    right: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '12%',
    overflow: 'hidden',
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
    zIndex: 10,
    // elevation: 10,
  },
  eyePress: {
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
    backgroundColor: '#e5f4f6',
    height: 48,
    width: '100%',
  },
  phoneTextContainerStyle: { backgroundColor: colors.CARD_BACKGROUND },
  codeText: {
    marginLeft: -20,
  },
  phoneContainer: {
    width: '100%',
    backgroundColor: colors.CARD_BACKGROUND,
    borderBottomWidth: 0.91,
    borderBottomColor: colors.DROP_DOWN_PICKER,
  },
  smsText: { marginTop: 5, color: colors.DROP_DOWN_PICKER_TEXT },
  currencyText: { color: colors.BLACK, fontSize: fontSize.TEXT_BASE, fontWeight: FontWeight.W600 },
  modal: { margin: 0 },
  counrtrymodalView: {
    height: '95%',
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
  loaderContainer: {
    flex: 1,
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },

  searchBarContainer: {
    marginHorizontal: 20,
    borderBottomWidth: 0.4,
    marginTop: 20,
    borderColor: colors.BLACK,
  },
  loader: {
    width: 80,
    height: 80,
  },
  selectCountryModalButtonStyle: {
    flexDirection: 'row',
    alignItems: AlignItemType.Center,
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    gap: 10,
    // borderWidth: 0.2,
    borderColor: colors.GREY,
    marginTop: 6,
    borderRadius: 20,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    shadowColor: colors.BLACK,
    elevation: 5,
  },

  modalText: { color: colors.BLACK, fontSize: 16 },
  currencyList: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    // paddingVertical: 40,
  },
  noCountryContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: AlignItemType.Center,
  },
})

export default styles
