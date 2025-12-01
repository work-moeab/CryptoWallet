import { endpoints } from '@src/constants/endPoints'
import { BaseAPIService } from '../base/BaseAPIService'
import { NavigationProps } from '@src/@types/navigation'
import { AppDispatch } from '@src/redux/store'

//BankAPIService.ts:
export class BankAPIService extends BaseAPIService {
  public constructor(navigation?: NavigationProps, dispatch?: AppDispatch) {
    super(navigation, dispatch)
  }
  // public getBankList(payload: object): Promise<GetBankListResponse> {
  //   return this.post(endpoints.GET_BANK_LIST, payload)
  // }

}
