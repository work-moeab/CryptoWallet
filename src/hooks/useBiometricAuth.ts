import { BiometricTypeEnum } from '@src/@types/enum'
import { useState, useEffect } from 'react'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const useBiometricAuth = () => {
  const rnBiometrics = new ReactNativeBiometrics()
  const [bioType, setBioType] = useState<BiometricTypeEnum>(BiometricTypeEnum.NotSupported)
  const [bioTypeName, setBioTypeName] = useState<string>('')

  useEffect(() => {
    const rnBiometrics = new ReactNativeBiometrics()
    rnBiometrics
      .isSensorAvailable()
      .then(({ available, biometryType }) => {
        if (available && biometryType === BiometryTypes.TouchID) {
          setBioType(BiometricTypeEnum.TouchId)
          setBioTypeName('Touch ID')
        } else if (available && biometryType === BiometryTypes.FaceID) {
          setBioTypeName('Face ID')
          setBioType(BiometricTypeEnum.FaceId)
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          setBioTypeName('Finger Print')
          setBioType(BiometricTypeEnum.Boimetrics)
        } else {
          setBioType(BiometricTypeEnum.NotSupported)
        }
      })
      .catch((error) => {
        if (error) return
      })
  }, [])

  const ifKeyExist = async () => {
    const { keysExist } = await rnBiometrics.biometricKeysExist()
    if (keysExist) return true
    else return false
  }
  const createKeys = async () => {
    const { publicKey } = await rnBiometrics.createKeys()
    return publicKey
  }

  const deleteKeys = async () => {
    rnBiometrics.deleteKeys()
  }

  const authenticate = async () => {
    const rnBiometrics = new ReactNativeBiometrics()
    try {
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      if (success) {
        return { success: true, error: null }
      } else {
        return { success: false, error: 'Authentication failed' }
      }
    } catch (error) {
      return { success: false, error: error ? 'Too many attempts. Use screen lock instead.' : '' }
    }
  }

  return { bioType, authenticate, ifKeyExist, deleteKeys, createKeys, bioTypeName }
}

export default useBiometricAuth
