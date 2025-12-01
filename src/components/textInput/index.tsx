import colors from '@src/constants/colors'
import { messages } from '@src/constants/messages'
import { ChevronDown, Eye, EyeOff } from 'lucide-react-native'
import React, { FC, useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Modal, Image, ScrollView } from 'react-native'
import styles from './styles'
import { FontWeight } from '@src/@types/enum'
import icons from '@src/assets/icons'
import { SearchBillFilter } from '../common/billPaymentComponents'
import { countryNumberList } from '@src/constants/countries'
import { ICustomTextInput } from '@src/@types/components/textInput'

const CustomTextInput: FC<ICustomTextInput> = ({
  containerViewStyle = {},
  inputTitle = '',
  inputTitleStyle = {},
  isPhoneNumber = false,
  isPassword = false,
  inputStyle = {},
  phoneChangeText,
  countryChangeText,
  phoneInputSubtext = false,
  ...rest
}) => {
  const [showPassword, setshowPassword] = useState<boolean>(isPassword)
  const [countryList] = useState<CountryData[]>(countryNumberList)
  const [countryListSearch, setCountryListSearch] = useState<string>('')
  const [countrycode, setCountryCode] = useState<CountryData>({
    callingCode: countryList[2].callingCode,
    flag: countryList[2].flag,
    name: countryList[2].name,
  })
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const secureEntry = () => {
    setshowPassword((prev) => !prev)
  }
  const filteredCountries = Object.values(countryList).filter((country) =>
    country.name.toLowerCase().includes(countryListSearch.toLowerCase()),
  )

  if (isPhoneNumber) {
    return (
      <View testID="withPhone" style={{ ...styles.mainContainer, ...containerViewStyle }}>
        {inputTitle && (
          <Text maxFontSizeMultiplier={1.4} style={{ ...styles.inputText, ...inputTitleStyle }}>
            {inputTitle}
          </Text>
        )}
        <View style={styles.flagMainContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.flagInputContainer}
            activeOpacity={0.4}>
            <View style={styles.flagIconContainer}>
              <Image
                source={{ uri: countrycode.flag }}
                style={styles.flagIcon}
                resizeMode="contain"
              />
              <ChevronDown size={16} color={colors.BLACK} />
              <Text
                maxFontSizeMultiplier={1.4}
                style={{ ...styles.modalText, fontWeight: FontWeight.W500 }}>
                +{countrycode.callingCode}
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            maxFontSizeMultiplier={1.4}
            placeholder="XXX-XXX"
            style={{
              ...styles.input,
              ...inputStyle,
              width: '55%',
            }}
            onChangeText={phoneChangeText}
            underlineColorAndroid="rgba(0,0,0,0)"
            secureTextEntry={showPassword}
            placeholderTextColor={colors.DROP_DOWN_PICKER_TEXT}
            {...rest}
          />
        </View>

        {/* //////////////////////////////////COUNTRIES-METHOD-SHEET/////////////////////////////////// */}
        <Modal visible={modalVisible} style={styles.modal} transparent animationType="slide">
          <View style={styles.counrtrymodalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
              testID="close">
              <Image source={icons.HOME_ICON_CLOSE_GREEN} style={styles.home} />
            </TouchableOpacity>
            <View style={styles.searchBarContainer}>
              <SearchBillFilter
                placeholder="Search Country"
                onChangeText={(text: string) => {
                  setCountryListSearch(text)
                }}
                value={countryListSearch}
              />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.currencyList}>
              {filteredCountries &&
                filteredCountries.length > 0 &&
                filteredCountries.map((country, index) => (
                  <TouchableOpacity
                    disabled={country.name === 'Curaçao' ? false : true}
                    onPress={() => {
                      setCountryCode(country)
                      if (countryChangeText) countryChangeText(country.callingCode)
                      setModalVisible(false)
                    }}
                    activeOpacity={0.6}
                    style={{
                      ...styles.selectCountryModalButtonStyle,
                      backgroundColor:
                        country.name === 'Curaçao' ? colors.CARD_BACKGROUND : colors.DISABLED_COLOR,
                    }}
                    key={index}>
                    <Image
                      source={{ uri: country.flag }}
                      style={styles.flagIcon}
                      resizeMode="contain"
                    />
                    <Text
                      maxFontSizeMultiplier={1.4}
                      style={{ ...styles.modalText, fontWeight: FontWeight.W500 }}>
                      +{country.callingCode}
                    </Text>

                    <Text
                      maxFontSizeMultiplier={1.4}
                      style={{ ...styles.modalText, fontWeight: FontWeight.W800 }}>
                      {country.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              {(!filteredCountries || filteredCountries.length < 1) && (
                <View style={styles.noCountryContainer}>
                  <Text style={{ ...styles.modalText, fontWeight: FontWeight.W500 }}>
                    No country found
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
        {phoneInputSubtext && (
          <Text maxFontSizeMultiplier={1.4} style={styles.smsText}>
            {messages.We_will_send_you_an_SMS_to_confirm}
          </Text>
        )}
      </View>
    )
  }

  return (
    <View testID="inputFields" style={{ ...styles.mainContainer, ...containerViewStyle }}>
      {inputTitle && (
        <Text maxFontSizeMultiplier={1.4} style={{ ...styles.inputText, ...inputTitleStyle }}>
          {inputTitle}
        </Text>
      )}
      <View style={isPassword ? { ...styles.passwordContainer } : {}}>
        <View style={styles.inputContainer}>
          <TextInput
            maxFontSizeMultiplier={1.4}
            style={{
              ...styles.input2,
              ...inputStyle,
              width: '100%',
            }}
            underlineColorAndroid="rgba(0,0,0,0)"
            secureTextEntry={showPassword}
            placeholderTextColor={colors.DROP_DOWN_PICKER_TEXT}
            {...rest}
          />
        </View>
        {isPassword && (
          <View style={styles.eye} testID="pressView" pointerEvents="box-none">
            <TouchableOpacity activeOpacity={0.4} onPress={secureEntry} style={styles.eyePress}>
              {showPassword ? (
                <EyeOff color={colors.DROP_DOWN_PICKER_TEXT} size={19} />
              ) : (
                <Eye color={colors.DROP_DOWN_PICKER_TEXT} size={19} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

export default CustomTextInput
