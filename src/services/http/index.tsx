import { AccountRoleEnum, Modals } from '@src/@types/enum'
import { NavigationProps } from '@src/@types/navigation'
import { URLS } from '@src/constants/apis'
import { endpoints } from '@src/constants/endPoints'
import { modalContent } from '@src/constants/modals'
import { keys } from '@src/constants/storageKeys'
import { deleteSecureValue, getSecureValue, setSecureValue } from '@src/helper/helper'
import { openModal } from '@src/redux/features/modals/modalSlice'
import {
  setAccountBalance,
  setInActiveUnlocked,
  setIsInternetAvailable,
  setNotificationData,
  setNotificationsListSize,
  setToken,
  setUnlockedState,
  setUserContacts,
} from '@src/redux/features/user/userSlice'
import { AppDispatch, store } from '@src/redux/store'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class HTTPService {
  private static instance: HTTPService | null = null
  private baseURL!: string
  private axiosInstance!: AxiosInstance
  private isRefreshing: boolean = false
  private failedQueue: {
    resolve: (token: string | null) => void
    reject: (error: unknown) => void
  }[] = []

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance
  }

  protected constructor(navigation?: NavigationProps, dispatch?: AppDispatch) {
    if (HTTPService.instance && HTTPService.instance.getBaseURL() === URLS.BASE_URL) {
      return HTTPService.instance
    }
    this.baseURL = URLS.BASE_URL
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    })
    this.setupInterceptors(dispatch)
    HTTPService.instance = this
  }

  public static getInstance(navigation?: NavigationProps, dispatch?: AppDispatch): HTTPService {
    if (!HTTPService.instance || HTTPService.instance.getBaseURL() !== URLS.BASE_URL) {
      HTTPService.instance = new HTTPService(navigation, dispatch)
    }
    return HTTPService.instance
  }

  public getBaseURL(): string {
    return this.baseURL
  }

  private processQueue(error: unknown, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })

    this.failedQueue = []
  }

  private setupInterceptors(dispatch?: AppDispatch): void {
    this.axiosInstance.interceptors.request.use((config) => {
      config.timeout = 10000
      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config
        const path = originalRequest?.url?.split('/') ?? []
        const pinEndpoints = [
          'ChipMobilePinLogin',
          'ChipMobileCheckUserDevice',
          'ChipMerchantPinLogin',
        ]

        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          return Promise.reject({
            message: 'Request timed out',
            output: null,
            responseCode: 408,
            success: false,
          })
        }

        const headers = error.response?.headers ?? {}

        if (
          ['user-device-changed', 'User-Device-Changed'].some(
            (header) => headers[header] === 'true',
          )
        ) {
          await this.handleUserExpired(
            dispatch,
            'You have been logged out, because you logged in on a different devices',
          )
        }

        if (
          ['User-Expired', 'user-expired', 'user-Expired', 'User-expired'].some(
            (header) => headers[header] === 'true',
          )
        ) {
          await this.handleUserExpired(dispatch, 'Account is currently not available')
        }

        if (
          [
            'Token-ChipAgent-Expired',
            'token-chipagent-expired',
            'Token-ChipAgentPin-Expired',
            'token-chipagentpin-expired',
            'Token-ChipMobile-Expired',
            'token-chipmobile-expired',
            'Token-ChipMobilePin-Expired',
            'token-chipmobilepin-expired',
          ].some((header) => headers[header] === 'true')
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject })
            })
              .then((token) => {
                if (originalRequest && token) {
                  originalRequest.headers['Authorization'] = 'Bearer ' + token
                  return axios(originalRequest)
                }
              })
              .catch((err) => Promise.reject(err))
          }

          this.isRefreshing = true
          const refreshToken = await getSecureValue<string | null>(keys.REFRESH_TOKEN)
          if (refreshToken) {
            try {
              const refreshedToken = await this.refreshAccessToken(refreshToken)

              if (
                (refreshedToken.token === null || refreshedToken.pinToken === null) &&
                !refreshedToken.networkError
              ) {
                this.handleUserExpired(
                  dispatch,
                  'You have been logged out, because you logged in on a different devices',
                )
                return
              }

              if (refreshedToken.networkError) {
                if (dispatch) {
                  dispatch(setIsInternetAvailable(false))
                  dispatch(
                    openModal({
                      isOpen: true,
                      name: Modals.NoInternetModal,
                      lowInternet: false,
                    }),
                  )
                }
                this.processQueue(new Error('Network error, please check your connection'), null)
                this.isRefreshing = false
                return Promise.reject({
                  message: 'Network connection error',
                  output: null,
                  responseCode: 0,
                  success: false,
                })
              }

              const usedToken = pinEndpoints.includes(path[path.length - 1])
                ? refreshedToken.pinToken
                : refreshedToken.token

              if (originalRequest) {
                originalRequest.headers['Authorization'] = `Bearer ${usedToken}`
                this.setAccessToken(refreshedToken.token || '')
                this.processQueue(null, refreshedToken.token)
                return axios(originalRequest)
              }
            } catch (refreshError) {
              this.processQueue(refreshError, null)
              return Promise.reject(refreshError)
            } finally {
              this.isRefreshing = false
            }
          } else {
            this.processQueue(new Error('No refresh token available'), null)
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      },
    )
  }

  private async handleUserExpired(dispatch?: AppDispatch, message?: string) {
    await deleteSecureValue(keys.TOKEN)
    await deleteSecureValue(keys.REFRESH_TOKEN)
    await deleteSecureValue(keys.REFRESH_PIN_TOKEN)
    await deleteSecureValue(keys.PIN_TOKEN)
    await deleteSecureValue(keys.MOBILE_NUMBER)

    if (dispatch) {
      dispatch(
        openModal(
          modalContent.INFO({
            title: 'CHIP',
            message: message,
            isSuccess: false,
            buttonText: 'Okay',
            backButton: () => {
              dispatch(
                setUserContacts({
                  contacts: [],
                  recentContacts: [],
                }),
              )
              dispatch(
                setAccountBalance({
                  balance: 0,
                  error: false,
                  currencyCode: '',
                }),
              )
              dispatch(
                setNotificationsListSize({
                  starts: 0,
                  ends: 10,
                  total: 10,
                }),
              )
              dispatch(setNotificationData([]))
              dispatch(setUnlockedState(false))
              dispatch(setInActiveUnlocked(false))
              this.setAccessToken('')
              dispatch(setToken(''))
            },
          }),
        ),
      )
    }
    return Promise.reject({
      message: 'An error occurred',
      output: null,
      responseCode: 500,
      success: false,
    })
  }

  private async request<TResponse>(
    method: string,
    endpoint: string,
    data: HTTPDataPayloadInterface,
    customConfig: AxiosRequestConfig = {},
  ): Promise<TResponse> {
    const url = this.baseURL + endpoint
    const config = {
      ...customConfig,
      headers: {
        ...this.axiosInstance.defaults.headers.common,
        ...customConfig.headers,
      },
    }
    const response = await this.axiosInstance.request<TResponse>({
      method,
      url,
      data,
      ...config,
      timeout: 10000,
    })
    return response.data
  }

  public post<TResponse>(
    endpoint: string,
    data: HTTPDataPayloadInterface,
    customConfig: AxiosRequestConfig = {},
  ): Promise<TResponse> {
    return this.request<TResponse>('post', endpoint, data, customConfig)
  }

  private async refreshAccessToken(refreshToken: string): Promise<{
    token: string | null
    pinToken: string | null
    message?: string
    networkError?: boolean
  }> {
    try {
      const { accountRole } = store.getState().settings
      const token = await this.post<IRefreshTokenResponse>(
        accountRole === AccountRoleEnum.Merchant
          ? endpoints.GET_ACCESS_TOKEN_MERCHANT
          : endpoints.GET_ACCESS_TOKEN,
        { refreshToken },
      )
      await setSecureValue(keys.PIN_TOKEN, token.output.pinToken)
      await setSecureValue(keys.TOKEN, token.output.token)
      if (token.output.refreshToken) {
        await setSecureValue(keys.REFRESH_TOKEN, token.output.refreshToken)
      }
      return { token: token.output.token, pinToken: token.output.pinToken }
    } catch (error: unknown) {
      let message = 'Something went wrong'
      let networkError = false

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message

        networkError =
          error.code === 'ECONNABORTED' ||
          !error.response ||
          error.message.includes('Network Error')
      }

      return {
        token: null,
        pinToken: null,
        message,
        networkError,
      }
    }
  }

  public setBaseUrl(newUrl: string): void {
    this.baseURL = newUrl
    this.axiosInstance.defaults.baseURL = newUrl
  }
  public setAccessToken(token: string): void {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export default HTTPService
