// src/services/api/APIService.ts (Main service that combines all services)
import { NavigationProps } from '@src/@types/navigation'
import { AuthAPIService } from './auth/AuthAPIService'
import { BankAPIService } from './bank/BankAPIService'
import { AppDispatch } from '@src/redux/store'

class APIService {
  private static instance: APIService | null = null

  public auth: AuthAPIService
  public bank: BankAPIService

  private constructor(navigation?: NavigationProps, dispatch?: AppDispatch) {
    this.auth = new AuthAPIService(navigation, dispatch)
    this.bank = new BankAPIService(navigation, dispatch)
  }

  public static getInstance(navigation?: NavigationProps, dispatch?: AppDispatch): APIService {
    if (!APIService.instance) {
      const instance = new APIService(navigation, dispatch)
      APIService.instance = instance // assign only after full construction
    }
    return APIService.instance
  }
}

export default APIService
