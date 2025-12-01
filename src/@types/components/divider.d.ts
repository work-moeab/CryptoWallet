import { FlexAlignType } from 'react-native'

//Divider
type ICustomDividerProps = {
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  height?: number
  width?: number
  alignSelf?: 'auto' | FlexAlignType | undefined
  dividerColor?: string
  testID?: string
}
