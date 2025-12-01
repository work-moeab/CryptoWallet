interface IUserLoginPayload {
  mobileNumber: string
  password: string
  uniqueId: string
  bioString: string | null
}

interface IUserPinLoginPayload {
  mobileNumber: string
  uniqueId: string
  chipPin: string
}

interface IUserForgetPassowrdValidatePayload {
  mobileNumber: string
  OTPCode: number
}
interface IUserForgetPinValidatePayload {
  mobileNumber: string
  OTPCode: number
}

interface IResendOtpPayload {
  mobileNumber: string
  otpCount: number
}
interface IUserResendForgetPasswordOtpPayload {
  mobileNumber: string
}
interface IUserResendForgetPinOtp {
  mobileNumber: string
}
interface IGetFaciaunAuthTokenPayload {
  mobileNumber: string
  smsCode: string
}
interface ICheckIfDeviceIsRegisteredPayload {
  uniqueId: string
}
interface IRegisterDeviceSendOTPPayload {
  uniqueId: string
  smsCode: number
}
interface IRegisterDeviceResendOTPPayload {
  uniqueId: string
  otpCount: number
}
interface IRegisterDevicePayload {
  uniqueId: string
  rememberMe: boolean
  deviceId: string
  deviceBrand: string
  platform: string
  appVersion: string
}

interface IMerchantCreatePinPayload {
  mobileNumber: string
  chipPin: string
  smsCode: number
}

interface ISignupMerchantStep2Payload {
  companyName: string
  countryCode: string
  phoneNumber: string
  password: string
  businessEmail: string
  uniqueId: string
  platform: string
  notificationToken: string
  deviceBrand: string
  deviceID: string
  isCompanyRegistered: boolean
  chamberRegNumber: number
  taxCribNo: number
  businessTypeId: number
  businessDescription: string
}

interface ISignupMerchantStep1Payload {
  mobileNumber: string
  email: string
}

interface IMerchantLoginPayload {
  mobileNumber: string
  password: string
  uniqueId: string
  bioString: string | null
}
interface IMerchantPinLoginPayload {
  mobileNumber: string
  chipPin: string
  uniqueId: string
}

interface IMerchantResendOtpPayload {
  mobileNumber: string
  otpCount: number
}
interface IMerchantValidateOtpPayload {
  mobileNumber: string
  smsCode: number
}

interface IMerchantResendForgetPasswordOtpPayload {
  mobileNumber: string
}

interface IMerchantResendForgetPinOtpPayload {
  mobileNumber: string
}

interface IMerchantNoOfDirectorsPrivatePayload {
  noOfDirectors: number
}
interface IMerchantUploadDirectorIDCardPrivatePayload {
  file: string
}
interface IMerchantUploadKVKExcertPrivatePayload {
  file: string
}
interface IMerchantUploadAddressPrivatePayload {
  file: string
}
interface IMerchantUploadAddressPayload {
  mobileNumber: string
  file: string
}
interface IMerchantUploadKVKExcertPayload {
  mobileNumber: string
  file: string
}
interface IMerchantUploadDirectorIDCardPayload {
  mobileNumber: string
  file: string
}
interface IMerchantNoOfDirectorsPayload {
  phoneNumber: string
  noOfDirectors: number
}

interface ISignupPayload {
  firstName: string
  lastName: string
  birthDate: Date
  mobileNumber: string
  password: string
  email: string
  uniqueId: string
  platform: string
  notificationToken: string
  deviceBrand: string
  deviceID: string
  isRefered: boolean
  referCode: string | undefined
}

interface ISignupValidatePayload {
  mobileNumber: string
  smsCode: number
}
interface IValidateEmailNumberPayload {
  mobileNumber: string
  email: string
}

interface IReactivateAccountPayload {
  mobileNumber: string
  otpCount: number
}

interface IOPTValidateReactivateAccountPayload {
  mobileNumber: string
  smsCode: number
  uniqueId: string
  deviceId: string
  platform: string
  deviceBrand: string
}

interface IValidateReferrerAccountStatusPayload {
  referCode: string
}

type AuthPayloadInterface =
  | IUserLoginPayload
  | IUserPinLoginPayload
  | IUserForgetPassowrdValidatePayload
  | IUserForgetPinValidatePayload
  | IResendOtpPayload
  | IUserResendForgetPasswordOtpPayload
  | IUserResendForgetPinOtp
  | IGetFaciaunAuthTokenPayload
  | ICheckIfDeviceIsRegisteredPayload
  | IRegisterDeviceSendOTPPayload
  | IRegisterDeviceResendOTPPayload
  | IRegisterDevicePayload
  | IMerchantCreatePinPayload
  | ISignupMerchantStep2Payload
  | ISignupMerchantStep1Payload
  | IMerchantLoginPayload
  | IMerchantPinLoginPayload
  | IMerchantResendOtpPayload
  | IMerchantValidateOtpPayload
  | IMerchantResendForgetPasswordOtpPayload
  | IMerchantResendForgetPinOtpPayload
  | IMerchantNoOfDirectorsPrivatePayload
  | IMerchantUploadDirectorIDCardPrivatePayload
  | IMerchantUploadKVKExcertPrivatePayload
  | IMerchantUploadAddressPrivatePayload
  | IMerchantUploadAddressPayload
  | IMerchantUploadKVKExcertPayload
  | IMerchantUploadDirectorIDCardPayload
  | IMerchantNoOfDirectorsPayload
