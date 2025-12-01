import {
  DRAWER,
  PAY,
  SIGN_IN,
 } from '@src/constants/routes'
import {
  Pay,
  SignIn,
} from '@src/screens/index'

import ChipDrawer from '../drawer'
import { IRouteArrayProps } from '@src/@types/navigation'

export const privateRoutes: IRouteArrayProps[] = [
  {
    id: 0,
    name: DRAWER,
    component: ChipDrawer,
  },
  {
    id: 1,
    name: PAY,
    component: Pay,
  },
 
  {
    id: 2,
    name: SIGN_IN,
    component: SignIn,
  },
]
