import { ViewStyle } from 'react-native'

//RadioButton
interface IRadioButtonProps {
  containerStyle: ViewStyle
  data: {
    id: string
    value: string
  }[]
  selected: string
  onPress: (item: { id: string; value: string }) => void
}
