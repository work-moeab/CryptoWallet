// src/services/api/auth/AuthAPIService.ts
import { NavigationProps } from '@src/@types/navigation'
import { BaseAPIService } from '../base/BaseAPIService'
import { AppDispatch } from '@src/redux/store'
import { endpoints } from '@src/constants/endPoints'

export class AuthAPIService extends BaseAPIService {
  public constructor(navigation?: NavigationProps, dispatch?: AppDispatch) {
    super(navigation, dispatch)
  }

  /////////////////////USER////////////////////////////////
  // Login Methods
  public login(payload: IUserLoginPayload): Promise<any> {
    return this.post(endpoints.LOGIN, payload)
  }
}
