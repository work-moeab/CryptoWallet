import SplashScreen from '@src/components/splash'
import { keys } from '@src/constants/storageKeys'
import { getAxiosError, getSecureValue, } from '@src/helper/helper'
import {
  setIsInternetAvailable,
} from '@src/redux/features/user/userSlice'
import { RootState } from '@src/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import StackNavigation from './stack'
import useFetchHomePageData from '@src/hooks/useFetchHomePageData'
import { IBioStringProps } from '@src/@types/common'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
import { useAPIService } from '@src/context/APIServiceContext'

const Root = () => {
  const dispatch = useDispatch()
  const apiService = useAPIService()
  const [customSplashScreen, setCustomSplashScreen] = useState<boolean>(true)
  const [noInternetModal, setNoInternetModal] = useState<boolean>(false)
  const { userInfo } = useSelector((state: RootState) => state.user)
  const {
    fetchDeviceUniqueId,
    fetchUserData,
  } = useFetchHomePageData()
  


  useEffect(() => {
    const subscription = NetInfo.addEventListener((state: NetInfoState) => {
      if (!state.isConnected) {
        // No internet at all
        dispatch(setIsInternetAvailable(false))
        setNoInternetModal(true)
      } else {
          dispatch(setIsInternetAvailable(true))
          setNoInternetModal(false)
      }
    })

    return () => subscription()
  }, [])

  useEffect(() => {
    const initialize = async () => {
      await fetchDeviceUniqueId()
      await fetchToken()
    }
    initialize()
  }, [])

 
  const fetchToken = async () => {
 return
  }

  const checkBiometrics = async () => {
    
  }

  return (
    <>
      {customSplashScreen ? (
        <SplashScreen onAnimationEnd={checkBiometrics} />
      ) : (
        <StackNavigation />
      )}
    </>
  )
}

export default Root
