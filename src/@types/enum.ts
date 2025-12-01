export enum TextAlignType {
  Auto = 'auto',
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
}

export enum AlignItemType {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  Stretch = 'stretch',
  Baseline = 'baseline',
}
export enum AlignSelfType {
  Auto = 'auto',
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  Stretch = 'stretch',
  Baseline = 'baseline',
}
export enum AlignContentType {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  Stretch = 'stretch',
  Baseline = 'baseline',
  SpaceBetween = 'space-between',
  SpaceArround = 'space-around',
}
export enum JustifyContentType {
  FlexStart = 'flex-start',
  FlexEnd = 'flex-end',
  Center = 'center',
  SpaceBetween = 'space-between',
  SpaceArround = 'space-around',
  SpaceEvenly = 'space-evenly',
}

export enum FontWeight {
  Bold = 'bold',
  Normal = 'normal',
  W100 = '100',
  W200 = '200',
  W300 = '300',
  W400 = '400',
  W500 = '500',
  W600 = '600',
  W700 = '700',
  W800 = '800',
  W900 = '900',
}
export enum KeyboardTypeEnum {
  Default = 'default',
  EmailAddress = 'email-address',
  Numeric = 'numeric',
  PhonePad = 'phone-pad',
  AsciiCapable = 'ascii-capable',
  NumbersAndPunctuation = 'numbers-and-punctuation',
  URL = 'url',
  NumberPad = 'number-pad',
  NamePhonePad = 'name-phone-pad',
  DecimalPad = 'decimal-pad',
  Twitter = 'twitter',
  WebSearch = 'web-search',
  VisiblePassword = 'visible-password',
}

export enum Modals {
  InfoModal = 'InfoModal',
  InfoWithIconModal = 'InfoWithIconModal',
  LoaderModal = 'LoaderModal',
  NoInternetModal = 'NoInternetModal',
  CommingSoonModal = 'CommingSoonModal',
  AlertModal = 'AlertModal',
  PaymentModal = 'PaymentModal',
}
export enum FilterTransactons {
  All = 'All',
  Paid = 'Paid',
  Received = 'Received',
  TopUp = 'Topup',
  CashOut = 'Cashout',
  Request = 'Request',
}
export enum MerchantHomeFilterTransactons {
  Recent = 'Recent',
}

export enum StatusBarStyle {
  default = 'default',
  light = 'light-content',
  dark = 'dark-content',
}


export enum BiometricTypeEnum {
  TouchId = 'TouchID',
  FaceId = 'FaceID',
  Boimetrics = 'Biometrics',
  NotSupported = 'NotSupported',
}

export enum PlatformTypeEnum {
  Android = 'android',
  Ios = 'ios',
}

export enum ImageUploadEnum {
  camera = 'camera',
  gallery = 'gallery',
  delete = 'delete',
}

export enum SettingsEnum {
  ChangePassword = 'Change Password',
  ChangePin = 'Change Pin',
  BalanceVisible = 'Hide Balance',
  Biometric = 'Enable Biometric',
}