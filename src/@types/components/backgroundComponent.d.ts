import { ReactNode } from 'react'
import { StatusBarStyle, ViewStyle } from 'react-native'

//Background
interface ICustomBackGroundProps {
  children?: ReactNode
  statusBarBGColor?: string
  statusBarColor?: StatusBarStyle
  avoidKeyboard?: boolean
  swipeAbleScreens?: boolean
  showsVerticalScrollIndicator?: boolean
  useLinear?: boolean
  refreshing?: boolean
  onRefresh?: () => void
  header?: IHeaderProps
  containerStyle?: ViewStyle
}
