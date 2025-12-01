import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '@src/components/drawer'
import { HOME } from '@src/constants/routes'
import React from 'react'
import { drawerRoutes } from './drawerRoutes'
import styles from './styles'

const Drawer = createDrawerNavigator()
const ChipDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={HOME}
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      {drawerRoutes.map((element) => (
        <Drawer.Screen
          key={element.name}
          name={element.name}
          component={element.component}
          options={{
            drawerIcon: () => element.icon,
            drawerItemStyle: styles.drawerItemStyle,
            drawerLabelStyle: styles.drawerLabelStyle,
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}

export default ChipDrawer
