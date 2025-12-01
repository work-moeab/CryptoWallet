// AuthAPIOutputTypes.ts

import { BiometricMatchEnum } from '@src/@types/enum'

interface ILoginOutput {
  accountLoginStatus: boolean
  email: string
  firstname: string
  lastname: string
  pinToken: string
  refreshPinToken: string
  accountStatus: string
  isBiometricsEntry: boolean
  isBiometricsAsked: boolean
  isBalanceVisible: boolean
  isBioStringMatch: BiometricMatchEnum
  isPinVerified: boolean
  userCode: number
}
interface IPinLoginOutput {
  token: string
  refreshToken: string
}

interface IGetFaciaAuthTokenOutput {
  token: string
}
interface IGetFaciaunAuthTokenOutput {
  token: string
}

interface ICheckIfDeviceIsRegisteredOutput {
  uniqueId: string
  deviceId: string
  deviceBrand: string
  plateform: string
  pinToken: string
}

interface IMerchantKycStatus {
  noOfDirectors: number
  idCardInfo: StepInfo
  addressVerificationInfo: StepInfo
  kvkDocument: string | null
  agreementPassed: boolean
}

interface IRegisterDeviceSendOTPOutput {
  pinToken: string
}
interface IOptValidateReactivateAccountOutput {
  token: string
  refreshToken: string
  pinToken: string
}

interface IMerchantCreatePinOutput {
  token: string
  refreshToken: string
  pinToken: string
  refreshPinToken: string
}
interface IMerchantLoginOutput {
  accountLoginStatus: boolean
  email: string
  firstname: string
  lastname: string
  pinToken: string
  refreshPinToken: string
  accountStatus: string
  isBiometricsEntry: boolean
  isBiometricsAsked: boolean
  isBalanceVisible: boolean
  isBioStringMatch: BiometricMatchEnum
  isPinVerified: boolean
  userCode: number
  agreementPassed: boolean
}
interface IMerchantPinLoginOutput {
  token: string
  refreshToken: string
}

interface IMerchantKycDocumentInfo {
  stepCompleted: boolean
  noOfUploadedImages: number
  remainingUploadedImages: number
  imagesUrl: string[]
}

interface IMerchantGetKycStatusOutput {
  noOfDirectors: number
  agreementPassed: boolean
  iDCardInfo: IMerchantKycDocumentInfo
  addressVerificationInfo: IMerchantKycDocumentInfo
  kVKDocument: string
}

type LoginResponse = IChipApiResponse<ILoginOutput>
type PinLoginResponse = IChipApiResponse<IPinLoginOutput>
type ForgetPasswordValidateResponse = IChipApiResponse<string>
type ForgetPinValidateResponse = IChipApiResponse<string>

type ResendOtpResponse = IChipApiResponse<string>
type ResendForgetPasswordOtpResponse = IChipApiResponse<string>
type ResendForgetPinOtpResponse = IChipApiResponse<string>

type GetFaciaAuthTokenResponse = IChipApiResponse<IGetFaciaAuthTokenOutput>
type GetFaciaunAuthTokenResponse = IChipApiResponse<IGetFaciaunAuthTokenOutput>

type CheckIfDeviceIsRegisteredResponse = IChipApiResponse<ICheckIfDeviceIsRegisteredOutput>
type RegisterDeviceSendOTPResponse = IChipApiResponse<IRegisterDeviceSendOTPOutput>
type RegisterDeviceResendOTPResponse = IChipApiResponse<null>
type RegisterDeviceResponse = IChipApiResponse<null>
type CheckUserDeviceLoggedInResponse = IChipApiResponse<boolean>

type SignupResponse = IChipApiResponse<string>
type SignupValidateResponse = IChipApiResponse<string>
type ValidateEmailNumberResponse = IChipApiResponse<string>

type ReactivateAccountResponse = IChipApiResponse<null>
type OptValidateReactivateAccountResponse = IChipApiResponse<IOptValidateReactivateAccountOutput>
type ValidateReferrerAccountStatusResponse = IChipApiResponse<string>

type MerchantCreatePinResponse = IChipApiResponse<IMerchantCreatePinOutput>
type SignupMerchantStep1Response = IChipApiResponse<string>
type SignupMerchantStep2Response = IChipApiResponse<string>

type MerchantLoginResponse = IChipApiResponse<IMerchantLoginOutput>
type MerchantPinLoginResponse = IChipApiResponse<IMerchantPinLoginOutput>

type MerchantResendOtpResponse = IChipApiResponse<string>
type MerchantValidateOtpResponse = IChipApiResponse<string>
type MerchantResendForgetPasswordOtpResponse = IChipApiResponse<string>
type MerchantResendForgetPinOtpResponse = IChipApiResponse<string>

type MerchantGetKycStatusResponse = IChipApiResponse<IMerchantKycStatus>

type MerchantNoOfDirectorsPrivateResponse = IChipApiResponse<string>
type MerchantUploadDirectorIDCardPrivateResponse = IChipApiResponse<string>
type MerchantUploadKVKExcertPrivateResponse = IChipApiResponse<string>
type MerchantUploadAddressPrivateResponse = IChipApiResponse<string>
type MerchantAgreementPrivateResponse = IChipApiResponse<number>

type MerchantNoOfDirectorsResponse = IChipApiResponse<string>
type MerchantUploadDirectorIDCardResponse = IChipApiResponse<string>
type MerchantUploadKVKExcertResponse = IChipApiResponse<string>
type MerchantUploadAddressResponse = IChipApiResponse<string>
type MerchantAgreementResponse = IChipApiResponse<number>
