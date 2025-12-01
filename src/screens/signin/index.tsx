import { useNavigation } from '@react-navigation/native'
import {
  KeyboardTypeEnum,
  StatusBarStyle,
} from '@src/@types/enum'
import Card from '@src/components/Card'
import Background from '@src/components/background'
import CustomButton from '@src/components/button'
import CustomTextInput from '@src/components/textInput'
import colors from '@src/constants/colors'
import { signInValidationSchema } from '@src/constants/validations'
import {
  getAxiosError,
  getSecureValue,
  getValidationErrors,
} from '@src/helper/helper'
import { useBackButtonHandler } from '@src/hooks/useBackButtonHandler'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'

import styles from './styles'
import { keys } from '@src/constants/storageKeys'
import { useAppSelector } from '@src/redux/hooks'
import { IBioStringProps } from '@src/@types/common'
import { NavigationProps } from '@src/@types/navigation'
import { useAPIService } from '@src/context/APIServiceContext'

const SignIn = () => {
  const navigation = useNavigation<NavigationProps>()
  const dispatch = useDispatch()
  useBackButtonHandler()
  const apiService = useAPIService()
  const { deviceUniqueId } = useAppSelector((state) => state.user)
  const [initialValues] = useState<SignInInitialValues>({
    password: '',
    mobileNumber: '',
    country_code: '5999',
  })



  const onSubmitUser = async (values: SignInInitialValues) => {
    apiService.auth.setAccessToken('')
    try {
      const bio = await getSecureValue<IBioStringProps | null>(keys.BIO_STRING)
      const numb = bio && bio.number === `+${values.country_code}${values.mobileNumber}`
      const data = {
        mobileNumber: `+${values.country_code}${values.mobileNumber}`,
        password: values.password,
        uniqueId: deviceUniqueId,
        bioString: numb ? (bio.string ? bio.string : null) : null,
      }
      const res = await apiService.auth.login(data)
      if (res.success) {
       
      }
    } catch (error: unknown) {
      const { message, responseCode } = getAxiosError(error)   
    }
  }

  return (
    <Background
      avoidKeyboard
      statusBarBGColor={colors.APP_BACKGROUND}
      statusBarColor={StatusBarStyle.dark}>
      <View testID="signincontainer" style={styles.container}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validateOnMount={signInValidationSchema.__isYupSchema__}
          validationSchema={signInValidationSchema}
          onSubmit={onSubmitUser}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            dirty,
            handleBlur,
            setFieldValue,
          }) => {
            return (
              <Card cardStyle={styles.cardContainerStyle}>
                <View style={styles.inputContainer}>
                  <CustomTextInput
                    testID="usernameInput"
                    accessibilityLabel="usernameInput"
                    isPhoneNumber={true}
                    phoneChangeText={(text) => setFieldValue('mobileNumber', text)}
                    countryChangeText={(text) => setFieldValue('country_code', text)}
                    keyboardType={KeyboardTypeEnum.NumberPad}
                    value={values.mobileNumber}
                    returnKeyType="next"
                    placeholderTextColor={colors.PLACEHOLDER_GREY}
                    autoComplete="username" // iOS-specific
                    textContentType="username"
                    importantForAutofill="yes"
                    autofillHints={['username']} // Android-specific
                  />
                  <CustomTextInput
                    testID="passwordInput"
                    accessibilityLabel="passwordInput"
                    placeholder={'Password'}
                    isPassword={true}
                    value={values.password}
                    autoComplete="current-password"
                    importantForAutofill="yes"
                    textContentType="password"
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    returnKeyType="next"
                  />
                  <Text maxFontSizeMultiplier={1.4} style={styles.error}>
                    {getValidationErrors(errors, values, dirty)}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={'Login'}
                    testID="User"
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    activeOpacity={0.7}
                    buttonStyle={{}}
                  />
                </View>
              </Card>
            )
          }}
        </Formik>
      </View>
    </Background>
  )
}

export default SignIn
