interface IAddBankAccountPayload {
  bankID: string
  accountNumber: string
}
interface IDeleteBankAccountPayload {
  accountNumber: string
}
interface IAddMerchantBankAccountPayload {
  bankID: string
  accountNumber: string
  bankAccountName: string
}
interface IDeleteMerchantBankAccountPayload {
  userBankID: string
}
interface IMerchantAddPayoutRequestPayload {
  amount: number
  userBankId: string
}

type BankPayloadInterface =
  | IAddBankAccountPayload
  | IDeleteBankAccountPayload
  | IAddMerchantBankAccountPayload
  | IDeleteMerchantBankAccountPayload
  | IMerchantAddPayoutRequestPayload
