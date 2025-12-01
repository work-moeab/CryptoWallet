import { ImageSourcePropType, ViewStyle } from 'react-native'
import {
  FilterTransactons,
  IconSpaceEnum,
  IconSpacePhysicalCardEnum,
  MerchantHomeFilterTransactons,
  PINEnum,
  SettingsEnum,
  VirtualCardStatusEnum,
} from './enum'
import { ICardExpirationDate, IResponseCardImages } from './apiService/card/response'

interface IOptionCardProps {
  title: string
  icon?: string | null
  route: string
  cardStyle: ViewStyle
  imageStyle: ImageStyle
  textStyle: TextStyle
  row?: boolean
}

interface ISettingsMap {
  name: SettingsEnum
  isRoute: boolean
  disabled: boolean
  params?: {
    pinType: PINEnum
  }
  subtext?: string
  route?: string
}
interface IMerchantSettingsMap {
  name: MerchantSettingsEnum
  isRoute: boolean
  disabled: boolean
  params?: {
    pinType: PINEnum
  }
  subtext?: string
  route?: string
}

interface IBioStringProps {
  string: string
  number: string
}

interface IUserData {
  mobileNumber: string
  countryCode?: string
  email?: string
}
