import { CommonActions } from '@react-navigation/native'

type NavigationProps = {
  navigate(route: string, Params?: object): ReactNavigation.RootParamList
  goBack(): ReactNavigation.RootParamList
  setOptions: (arg: object) => void
  closeDrawer: () => void
  openDrawer: () => void
  canGoBack: () => void
  replace(route: string, Params?: object): ReactNavigation.RootParamList
  addListener: (event: string, callback: () => void) => void
  removeListener: (event: string, callback: () => void) => void
  dispatch: (action: CommonActions) => void
  popToTop: () => void
}

interface IRouteArrayProps {
  id: number
  name: string
  component: React.ComponentType
}
interface IDrawerRouteArrayProps {
  id: number
  name: string
  component: React.ComponentType
  icon: React.ReactNode
}
