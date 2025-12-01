interface IRefreshTokenPayload {
  refreshToken: string
}

type HTTPDataPayloadInterface =
  | object
  | IRefreshTokenPayload
  | BankPayloadInterface
  | AuthPayloadInterface
