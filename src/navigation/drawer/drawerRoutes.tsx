import {
  HOME,
  QR_CODE,
  SETTINGS,
} from '@src/constants/routes'
import {
  Home,
  QRCodeScreen,
  Settings,
} from '@src/screens/index'

import {
  HomeIcon,
  QrCodeIcon,
  Settings as SettingsIcon,
} from 'lucide-react-native'
import React from 'react'
import colors from '@src/constants/colors'
import { IDrawerRouteArrayProps } from '@src/@types/navigation'

export const drawerRoutes: IDrawerRouteArrayProps[] = [
  {
    id: 0,
    name: HOME,
    component: Home,
    icon: <HomeIcon size={25} color={colors.BLACK} />,
  },
  {
    id: 1,
    name: QR_CODE,
    component: QRCodeScreen,
    icon: <QrCodeIcon size={25} color={colors.BLACK} />,
  },
 
  {
    id: 2,
    name: SETTINGS,
    component: Settings,
    icon: <SettingsIcon size={25} color={colors.BLACK} />,
  },

]
