interface SignInInitialValues {
  password: string
  mobileNumber: string
  country_code: string
  [key: string]: unknown
}

interface IPinScreenData {
  data: {
    password: string
    mobileNumber: string
    country_code: string
    pinToken: string
    email?: string
    refreshToken?: string
    merchant?: boolean
    message?: string
  }
  pinType: PINEnum
}
