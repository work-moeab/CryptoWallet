import { ChangeEvent } from 'react'
import { TextInputProps } from 'react-native'

//TextInput
interface ICustomTextInput extends TextInputProps {
  containerViewStyle?: object
  inputTitle?: string
  inputTitleStyle?: object
  isPhoneNumber?: boolean
  isPassword?: boolean
  inputStyle?: object
  phoneInputSubtext?: boolean
  phoneChangeText?: (e?: string | ChangeEvent<string>) => void
  countryChangeText?: (e?: string | ChangeEvent<string>) => void
  [key: string]: unknown
}
