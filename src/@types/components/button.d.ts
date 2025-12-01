import { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native'

//Button
interface ICustomButtonProps extends TouchableOpacityProps {
  title: string
  loadingMessage?: string
  buttonStyle?: ViewStyle
  textStyle?: TextStyle
  isLoading?: boolean
}
