import { AlignItemType, JustifyContentType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import { deviceDimensions } from '@src/helper/helper'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  dummyContainer: {
    width: 100,
    height: deviceDimensions.height * 0.09,
  },
  dialPadContainer: {
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
    width: 100,
    height: deviceDimensions.height * 0.09,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.HEADER,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  numPadContainer: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: JustifyContentType.Center,
    width: '100%',
  },
  dialPadText: {
    color: colors.BLACK,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})

export default styles
