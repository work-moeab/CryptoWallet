// BankAPIOutputTypes.ts

interface IGetBankListOutput {
  bankID: string
  bankName: string
  bankLogoURL: string
}

interface IGetUserConnectedBankListOutput {
  accountNumber: string
  bankName: string
  bankLogoURL: string
  bankActiveStatus: boolean
}

interface IGetMerchantBankListOutput {
  bankID: string
  bankName: string
  bankLogoURL: string
}

interface IGetMerchantConnectedBankListOutput {
  userBankID: string
  accountNumber: string
  bankName: string
  bankLogo: string
}

type GetBankListResponse = IChipApiResponse<IGetBankListOutput[]>
type AddBankAccountResponse = IChipApiResponse<number>
type DeleteBankAccountResponse = IChipApiResponse<number>
type GetUserConnectedBankListResponse = IChipApiResponse<IGetUserConnectedBankListOutput[]>

type GetMerchantBankListResponse = IChipApiResponse<IGetMerchantBankListOutput[]>
type AddMerchantBankAccountResponse = IChipApiResponse<number>
type DeleteMerchantBankAccountResponse = IChipApiResponse<string>
type GetMerchantConnectedBankListResponse = IChipApiResponse<IGetMerchantConnectedBankListOutput[]>
type MerchantAddPayoutRequestResponse = IChipApiResponse<number>
