import { IRouteArrayProps } from '@src/@types/navigation'
import {
  SIGN_IN,
} from '@src/constants/routes'
import {
  SignIn,
} from '@src/screens/index'

export const publicRoutes: IRouteArrayProps[] = [
  {
    id: 1,
    name: SIGN_IN,
    component: SignIn,
  },
]
