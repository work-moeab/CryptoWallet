// src/services/api/base/BaseAPIService.ts
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { NavigationProps } from '@src/@types/navigation'
import HTTPService from '@src/services/http'
import { AppDispatch } from '@src/redux/store'
import { URLS } from '@src/constants/apis'
import { getAxiosError } from '@src/helper/helper'

export abstract class BaseAPIService {
  protected axiosInstance: AxiosInstance
  private readonly baseURL: string

  constructor(navigation?: NavigationProps, dispatch?: AppDispatch) {
    const http = HTTPService.getInstance(navigation, dispatch)
    this.axiosInstance = http.getAxiosInstance()
    this.baseURL = URLS.BASE_URL
  }

  protected createAuthConfig(token?: string): AxiosRequestConfig {
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  }

  private async request<TResponse>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data: HTTPDataPayloadInterface = {},
    customConfig: AxiosRequestConfig = {},
  ): Promise<TResponse> {
    const url = this.baseURL + endpoint

    const urlParts = endpoint.split('/').filter(Boolean)
    const envParts = this.baseURL.split('.').filter(Boolean)
    const apiInfo = `Env: ${envParts[1] ?? 'unknown'} | Controller: ${urlParts[1] ?? ''} | Endpoint: ${urlParts[2] ?? ''}`
    console.log(apiInfo)

    const config: AxiosRequestConfig = {
      ...customConfig,
      headers: {
        ...this.axiosInstance.defaults.headers.common,
        ...customConfig.headers,
      },
    }
    try {
      const response = await this.axiosInstance.request<TResponse>({
        method,
        url,
        data,
        ...config,
        timeout: 10000,
      })
      return response.data
    } catch (error) {
      const { message } = getAxiosError(error)
      console.log('Error in :', urlParts[1], message)
      throw error
    }
  }

  public post<TResponse>(
    endpoint: string,
    data: HTTPDataPayloadInterface = {},
    config: AxiosRequestConfig = {},
  ): Promise<TResponse> {
    return this.request<TResponse>('post', endpoint, data, config)
  }

  public setAccessToken(token: string): void {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}
