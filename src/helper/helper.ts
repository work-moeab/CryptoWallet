import Clipboard from '@react-native-clipboard/clipboard'
import {
  AccountRoleEnum,
  CardFormValuesEnum,
  Modals,
  PhysicalCardIconEnum,
  virtualCardIconEnum,
} from '@src/@types/enum'
import { messages } from '@src/constants/messages'
import { UUID_REGEX } from '@src/constants/regex'
import { closeModal } from '@src/redux/features/modals/modalSlice'
import axios from 'axios'
import { FormikErrors } from 'formik'
import moment from 'moment'
import {
  Alert,
  Animated,
  Dimensions,
  ImageSourcePropType,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { check, PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions'
import Toast from 'react-native-simple-toast'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import Contacts, { Contact, PhoneNumber } from 'react-native-contacts'
import { physicalCardIcon, virtualCardIcon } from '@src/assets/virtualCard/svg'

import ReactNativeHapticFeedback, { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import { getApp } from '@react-native-firebase/app'
import { getCrashlytics } from '@react-native-firebase/crashlytics'
import { getAnalytics } from '@react-native-firebase/analytics'
import {
  IMerchantTranactionListProps,
  KycCheckResult,
  KycStatus,
} from '@src/@types/redux/slices/merchant'
import { AppDispatch } from '@src/redux/store'
import {
  IGetMerchantTransactionSearchResult,
  IGetTransactionssearchResult,
} from '@src/@types/apiService/payment/response'
import {
  INotificationData,
  INotificationDetails,
  ITranactionListProps,
  UserContact,
} from '@src/@types/redux'

const deviceDimensions = Dimensions.get('screen')


async function checkAndRequestPermissions() {
  try {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ])
    } else if (Platform.OS === 'ios') {
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CONTACTS])
    }
  } catch (error) {
    if (error) return
    /* error */
  }
}

const checkContactsPermission = async () => {
  let permission
  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.CONTACTS
  } else {
    permission = PERMISSIONS.ANDROID.READ_CONTACTS
  }

  const result = await check(permission)
  return result
}

const showToast = (message: string) => {
  Toast.show(message, Toast.LONG, {
    tapToDismissEnabled: true,
  })
}
const copyToClipboard = (value: string) => {
  Clipboard.setString(value)
  showToast(messages.COPIED_TO_CLIPBOARD)
}

const setSecureValue = async (key: string, value: string | boolean | object) => {
  const stringified = JSON.stringify(value)
  RNSecureStorage.setItem(key, stringified, { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
const deleteSecureValue = async (key: string) => {
  RNSecureStorage.removeItem(key)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
const deleteALLSecureValue = async (key: string[]) => {
  RNSecureStorage.multiRemove(key)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const getSecureValue = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await RNSecureStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch {
      // If parsing fails, return the raw value
      return value as unknown as T
    }
  } catch (err) {
    if (err) return null
    else return null
  }
}

const minimumDate = (year: number = 100) => {
  const today = new Date()
  const minDate = new Date()
  const newDate = new Date(minDate.setFullYear(today.getFullYear() - year))
  return newDate
}
const maximumDate = (year: number = 100) => {
  const today = new Date()
  const minDate = new Date()
  return minDate.setFullYear(today.getFullYear() + year)
}


const getValidationErrors = <T extends Record<string, unknown>>(
  errors: FormikErrors<T>,
  values: T,
  isDirty: boolean,
): string => {
  return Object.entries(errors)
    .filter(([key]) => {
      const typedKey = key as keyof T
      return key === 'terms' || (isDirty && !!values[typedKey])
    })
    .map(([_, message]) => `* ${message}`)
    .join('\n')
}


const getDateRange = ({ totalNum, unit, isPrev }: GetDateRangeParams) => {
  const today = moment()
  let startDate
  let endDate

  if (isPrev) {
    switch (unit) {
      case 'weeks':
        // Start from the Monday of the current week
        startDate = today.clone().startOf('isoWeek') // ISO week starts from Monday
        // End at the current date
        endDate = today.clone().endOf('day') // The current date's end of the day
        break

      case 'months':
        startDate = today.clone().subtract(totalNum, 'months').startOf('month')
        endDate = today.clone().subtract(totalNum, 'months').endOf('month')
        break

      case 'quarter':
        // Last 3 months: Start 3 months before the last month, and end at the last day of the last month
        startDate = today
          .clone()
          .subtract(totalNum + 2, 'months')
          .startOf('month')
        endDate = today.clone().subtract(totalNum, 'months').endOf('month')
        break

      case 'years':
        startDate = today.clone().subtract(totalNum, 'years').startOf('year')
        endDate = today.clone().subtract(totalNum, 'years').endOf('year')
        break

      default:
        startDate = today.clone().startOf('day')
        endDate = today.clone().endOf('day')
        break
    }
  } else {
    startDate = today.clone().startOf(unit as moment.unitOfTime.StartOf)
    endDate = today
      .clone()
      .add(totalNum, unit as moment.unitOfTime.DurationConstructor)
      .endOf(unit as moment.unitOfTime.StartOf)
  }

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
  }
}

const handleConversion = (output: Date) => {
  const selectedDate = new Date(output)
  const formattedDate =
    selectedDate.getFullYear().toString() +
    '-' +
    (selectedDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    selectedDate.getDate().toString().padStart(2, '0')

  // Check if user is 18+
  const today = new Date()
  const age = today.getFullYear() - selectedDate.getFullYear()
  const isAdult =
    age > 18 ||
    (age === 18 &&
      (today.getMonth() > selectedDate.getMonth() ||
        (today.getMonth() === selectedDate.getMonth() &&
          today.getDate() >= selectedDate.getDate())))

  return { formattedDate, isAdult }
}

const extractPhoneNumbers = (contacts: Contact[]) => {
  return contacts.flatMap((contact: Contact) =>
    contact.phoneNumbers.map((phoneNumber: PhoneNumber) => phoneNumber.number),
  )
}


const validateImageUri = (uri: string | null): boolean => {
  if (uri === null) return false
  // Regular expression to validate URL format
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)' + // Protocol (http or https)
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?' + // Port
      '(\\/[-a-zA-Z\\d%_.~+]*)*' + // Path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-zA-Z\\d_]*)?$', // Fragment locator
  )

  if (!urlPattern.test(uri)) {
    return false
  }

  // Validate image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
  const uriLower = uri.toLowerCase()

  for (const ext of imageExtensions) {
    if (uriLower.endsWith(ext)) {
      return true
    }
  }

  return false
}

const convertNumberToString = (value: number) => {
  let newValue = value.toFixed(2)
  newValue = newValue.toString()
  return newValue
}

const convertStringToDecimalNumber = (value: string): number => {
  return parseFloat(Number(value).toPrecision(2))
}

function formatNumberAsString(value: number): string {
  // Ensure the number has exactly two decimal places
  const valueString = value.toFixed(2)

  // Split the value into the integer and decimal parts
  const parts = valueString.split('.')
  const integerPart = parts[0]
  const decimalPart = parts.length > 1 ? '.' + parts[1] : ''

  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Combine the formatted integer part with the decimal part
  const formattedValue = formattedIntegerPart + decimalPart

  return formattedValue
}

const getAxiosError = (error: unknown): IAxiosErrorProps => {
  if (axios.isAxiosError(error) && error.response) {
    // Handle stringified JSON data
    let responseData = error.response.data
    if (typeof responseData === 'string') {
      try {
        responseData = JSON.parse(responseData)
      } catch (e) {
        console.error('Failed to parse response data:', e)
        return {
          message: 'An error occurred',
          output: null,
          responseCode: error.response.status,
          success: false,
        }
      }
    }

    // Check for message or Message (case-insensitive)
    let message = responseData.message || responseData.Message

    if (!message) {
      const foundKey = Object.keys(responseData).find(
        (key) => key.toLowerCase() === 'message' && typeof responseData[key] === 'string',
      )
      if (foundKey) {
        message = responseData[foundKey]
      }
    }

    message = message || 'An error occurred'

    return {
      message,
      output: null,
      responseCode: error.response.status,
      success: false,
    }
  }

  return {
    message: 'An error occurred',
    output: null,
    responseCode: 500,
    success: false,
  }
}


const processContactsData = async (
  contacts: UserContact[],
): Promise<{ contacts: UserContact[] }> => {
  const processed = await processContacts(contacts)

  return { contacts: processed }
}

const processContacts = async (contacts: UserContact[]): Promise<UserContact[]> => {
  const processedContacts: UserContact[] = []
  for (const contact of contacts) {
    const contactInfo = await Contacts.getContactsByPhoneNumber(contact.phoneNumber)
    if (contactInfo.length > 0) {
      let firstName = ''
      let lastName = ''
      if (Platform.OS === 'ios') {
        firstName = contactInfo[0].givenName ?? ''
        lastName = contactInfo[0].familyName ?? ''
      } else {
        const rawDisplayName = contactInfo[0].displayName
        if (rawDisplayName) {
          const displayNameParts = rawDisplayName.split(' ')
          firstName = displayNameParts[0]
          lastName = displayNameParts.length > 1 ? displayNameParts.slice(1).join(' ') : ''
        }
      }
      processedContacts.push({
        firstName,
        lastName,
        image: contact.image,
        phoneNumber: contact.phoneNumber,
      })
    } else {
      processedContacts.push(contact)
    }
  }
  // Sort the contacts alphabetically by firstName, or by lastName if firstName is missing
  processedContacts.sort((a, b) => {
    const nameA = a.firstName?.toLowerCase() || a.lastName?.toLowerCase() || ''
    const nameB = b.firstName?.toLowerCase() || b.lastName?.toLowerCase() || ''
    return nameA.localeCompare(nameB)
  })

  return processedContacts
  // return processedContacts
}


const openAppSettings = () => {
  Alert.alert(
    'Permission Required',
    'Please allow camera and gallery access in settings to upload images.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ],
  )
}

const checkPermission = async (type: 'camera' | 'gallery') => {
  const permission =
    Platform.OS === 'ios'
      ? type === 'camera'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.IOS.PHOTO_LIBRARY
      : type === 'camera'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE

  const result = await check(permission)
  if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) return true
  if (result === RESULTS.DENIED) {
    const newResult = await request(permission)
    return newResult === RESULTS.GRANTED || newResult === RESULTS.LIMITED
  }
  if (result === RESULTS.BLOCKED) {
    openAppSettings()
  }
  return false
}

const formatNumberWithCommas = (num: string) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export {
  formatNumberWithCommas,
  checkPermission,
  deleteALLSecureValue,
  processContactsData,
  getAxiosError,
  formatNumberAsString,
  convertStringToDecimalNumber,
  convertNumberToString,
  validateImageUri,
  extractPhoneNumbers,
  handleConversion,
  minimumDate,
  maximumDate,
  setSecureValue,
  getSecureValue,
  deleteSecureValue,
  showToast,
  getValidationErrors,
  copyToClipboard,
  getDateRange,
  checkAndRequestPermissions,
  checkContactsPermission,
  deviceDimensions,
}
