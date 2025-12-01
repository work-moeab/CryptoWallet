// utils/timeoutUtils.ts

type TimeoutMap = Map<string, ReturnType<typeof setTimeout>>

//Axios error interface
interface IAxiosErrorProps {
  message: string
  output: null | object
  responseCode: number
  success: boolean
}

//AdditionalData for log analytics interface
interface AdditionalData {
  [key: string]: string | number | boolean | null | undefined
}

// GetDateRangeParams interface
interface GetDateRangeParams {
  totalNum: number
  unit: 'days' | 'weeks' | 'months' | 'years' | 'quarter'
  isPrev: boolean
}

