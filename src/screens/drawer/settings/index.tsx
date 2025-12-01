import { useNavigation } from '@react-navigation/native'
import { ISettingsMap } from '@src/@types/common'
import { BiometricTypeEnum, Modals, SettingsEnum } from '@src/@types/enum'
import Background from '@src/components/background'
import colors from '@src/constants/colors'
import {
  deleteSecureValue,
  getAxiosError,
  setSecureValue,
  showToast,
} from '@src/helper/helper'
import useBiometricAuth from '@src/hooks/useBiometricAuth'
import { setBioString,  setUserInfo } from '@src/redux/features/user/userSlice'
import { RootState } from '@src/redux/store'
import { ChevronRight, Menu } from 'lucide-react-native'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Switch, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useDispatch, useSelector } from 'react-redux'

import styles from './styles'
import { keys } from '@src/constants/storageKeys'
import useFetchHomePageData from '@src/hooks/useFetchHomePageData'
import LottieView from 'lottie-react-native'
import loader from '@src/assets/loader'
import { NavigationProps } from '@src/@types/navigation'
import { useAPIService } from '@src/context/APIServiceContext'


const SettingsMap: ISettingsMap[] = [
  {
    name: SettingsEnum.ChangePassword,
    isRoute: true,
    route: '',
    disabled: false,
  },
  {
    name: SettingsEnum.ChangePin,
    isRoute: true,
    route: '',
    disabled: false,
  },
  {
    name: SettingsEnum.BalanceVisible,
    isRoute: false,
    disabled: true,
  },
  {
    name: SettingsEnum.Biometric,
    isRoute: false,
    disabled: true,
  },
  
]

const Settings = () => {
  const navigation = useNavigation<NavigationProps>()
  const dispatch = useDispatch()
  const apiService = useAPIService()
  const { userInfo, bioString,  } = useSelector(
    (state: RootState) => state.user,
  )
  const { fetchUserData } = useFetchHomePageData()
  const { bioType, authenticate, createKeys, deleteKeys } = useBiometricAuth()
  const [oading, setLoading] = useState<boolean>(false)
  const handlePress = (item: ISettingsMap) => {
    if (item.isRoute && item.route) {
      navigation.navigate(item.route, item.params)
    }   
  }

  const handleBiometric = (key: boolean) => {
    if (bioType === BiometricTypeEnum.NotSupported) {
      showToast("BIOMETRIC_NOT_SUPPORTED")
    } else {
        if (key) registerBiometrics()
        else deleteBiometrics()
    }
  }

  const registerBiometrics = async () => {
    const verify = await authenticate()
    if (verify.success) {
      const bioKeys = await createKeys()
      setLoading(true)
      try {
        const data = {
          biometric: bioKeys,
        }
          await setSecureValue(keys.BIO_STRING, { string: bioKeys, number: userInfo.phoneNumber })
          dispatch(setBioString({ string: bioKeys, number: userInfo.phoneNumber }))
      } catch (error: unknown) {
        const { message } = getAxiosError(error)
        
setLoading(false)}
      }
}

  const deleteBiometrics = async () => {
    const verify = await authenticate()
    if (verify.success) {
      setLoading(true)
          deleteKeys()
          await deleteSecureValue(keys.BIO_STRING)
          dispatch(setBioString({ string: '', number: '' }))
          setLoading(false)
    }
  }

  const renderSettingsMap = () => {
 
    const thumbColor = !!bioString.string ? colors.WHITE : '#f4f3f4'
      return (
        <Switch
          trackColor={{ false: '#767577', true: '#32CD32' }}
          thumbColor={thumbColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleBiometric}
          value={!!bioString.string}
        />
      )
  }

  return (
    <Background
      swipeAbleScreens
      header={{
        title: 'SETTINGS',
        leftIcon: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Menu size={25} color={colors.WHITE} />
          </TouchableOpacity>
        ),
      }}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollContainer}>
        {SettingsMap.map((item: ISettingsMap) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => handlePress(item)}
            disabled={item.disabled}
            style={styles.container}
            activeOpacity={0.9}>
            <View
              style={{
                ...styles.innerContainer,
              }}>
              <View style={styles.textContainer}>
                <Text maxFontSizeMultiplier={1.4} style={{ ...styles.textStyle }}>
                  {item.name}
                </Text>
                {item.subtext && (
                  <Text maxFontSizeMultiplier={1.4} style={{ ...styles.subText }} numberOfLines={2}>
                    {item.subtext}
                  </Text>
                )}
              </View>
              {renderSettingsMap()}
            </View>
          </TouchableOpacity>
        ))}

        <Text maxFontSizeMultiplier={1.4} style={styles.versionText}>
          {"Crypto Wallet"}
          {DeviceInfo.getVersion()}
        </Text>
      </ScrollView>
    </Background>
  )
}

export default Settings
