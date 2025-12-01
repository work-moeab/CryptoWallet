import { ICustomDividerProps } from '@src/@types/components/divider'
import { AlignSelfType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import React from 'react'
import { View } from 'react-native'

const Divider: React.FC<ICustomDividerProps> = ({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  height,
  width,
  alignSelf,
  dividerColor,
  testID,
}) => {
  return (
    <View
      testID={testID}
      style={{
        backgroundColor: dividerColor ? dividerColor : colors.BLACK,
        height: height ? height : 1,
        width: width ? width : 50,
        alignSelf: alignSelf ? alignSelf : AlignSelfType.Center,
        marginTop: marginTop ? marginTop : 0,
        marginBottom: marginBottom ? marginBottom : 0,
        marginLeft: marginLeft ? marginLeft : 0,
        marginRight: marginRight ? marginRight : 0,
      }}
    />
  )
}

export default Divider
