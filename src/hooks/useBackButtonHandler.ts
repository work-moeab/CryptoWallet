import { useFocusEffect, useRoute } from '@react-navigation/native';
import {
  HOME,
  SIGN_IN,
} from '@src/constants/routes';
import { showToast } from '@src/helper/helper';
import { useCallback, useState } from 'react';
import { BackHandler } from 'react-native';
export const useBackButtonHandler = () => {
  const [backPressed, setBackPressed] = useState<number>(0);
  const route = useRoute();
  let timeout:any;

  const routesToHandleBackPress = [
    SIGN_IN,
    HOME,
  ];

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (routesToHandleBackPress.includes(route.name)) {
          if (backPressed > 0) {
            BackHandler.exitApp();
          } else {
            setBackPressed(backPressed + 1);
            showToast('Press again to exit');
            timeout=  setTimeout(() => {
              setBackPressed(0)
            }, 3000);
          }
          return true;
        }
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        backHandler.remove();
        clearTimeout(timeout)
      };
    }, [backPressed, setBackPressed])
  );
};
