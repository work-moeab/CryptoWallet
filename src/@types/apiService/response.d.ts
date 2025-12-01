interface IChipApiResponse<T> {
  message: string
  output: T
  responseCode: number
  success: boolean
}

interface IRefreshTokenOutput {
  token: string
  refreshToken: string
  pinToken: string
}

type IRefreshTokenResponse = IChipApiResponse<IRefreshTokenOutput>
