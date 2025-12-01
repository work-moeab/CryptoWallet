import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DRAWER,
  PRIVATE_STACK,
  PUBLIC_STACK,
  SIGN_IN,
} from '@src/constants/routes';
import { privateRoutes } from '@src/navigation/stack/privateRoutes';
import { publicRoutes } from '@src/navigation/stack/publicRoutes';
import { RootState } from '@src/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAPIService } from '@src/context/APIServiceContext';

const PublicStack = createNativeStackNavigator();
function PublicStackNavigator() {
  return (
    <PublicStack.Navigator
      initialRouteName={SIGN_IN}
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      {publicRoutes.map((item) => (
        <PublicStack.Screen key={item.id} name={item.name} component={item.component} />
      ))}
    </PublicStack.Navigator>
  );
}

const PrivateStack = createNativeStackNavigator();
function PrivateStackNavigator() {
  return (
    <PrivateStack.Navigator
      initialRouteName={DRAWER}
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {privateRoutes.map((item) => (
        <PrivateStack.Screen key={item.id} name={item.name} component={item.component} />
      ))}
    </PrivateStack.Navigator>
  );
}


const RootStack = createNativeStackNavigator();
const StackNavigation = () => {
  const { token } = useSelector((state: RootState) => state.user);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <RootStack.Screen name={PRIVATE_STACK} component={PrivateStackNavigator} />
      ) : (
        <RootStack.Screen name={PUBLIC_STACK} component={PublicStackNavigator} />
      )}
    </RootStack.Navigator>
  );
};
export default StackNavigation;
