import * as yup from 'yup'

import { validations } from './messages'
import { ONLY_CHARACTERS, ONLY_NUMBERS, PASSWORD_REG_EXP, PHONE_REG_EXP } from './regex'

const mobileValidationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(PHONE_REG_EXP, validations.PHONE_NUMBER_IS_NOT_VALID)
    .required(validations.PHONE_NUMBER_IS_REQUIRED),
  country_code: yup.string().matches(/5999|92/, validations.COUNTRY_IS_NOT_VALID),
})
const addBankValidationSchema = yup.object().shape({
  bank: yup.string().required('Bank is required'),
  accountNo: yup.string().required('Account Number is required'),
  address: yup.string().required('Address is required'),
  routingNo: yup.string().max(50),
})
const topUpValidationSchema = yup.object().shape({
  amount: yup
    .string()
    .required(validations.AMOUNT_IS_REQUIRED)
    .notOneOf(['0.00'], 'Amount must be greater than 0'),
})
const cashOutAmountValidationSchema = yup.object().shape({
  amount: yup
    .string()
    .required(validations.AMOUNT_IS_REQUIRED)
    .notOneOf(['0.00'], 'Amount must be greater than 0'),
})

const requestAmountValidationSchema = yup.object().shape({
  amount: yup
    .string()
    .required(validations.AMOUNT_IS_REQUIRED)
    .notOneOf(['0.00'], 'Amount must be greater than 0'),
  description: yup
    .string()
    .min(1, validations.DESCRIPTION_MIN)
    // .matches(/^[a-zA-Z0-9\s]*$/, 'Only letters, numbers, and spaces are allowed')
    .matches(/^[\p{L}\p{N}\s\p{Emoji}]*$/u, 'Only letters, numbers, and spaces are allowed')
    .required(validations.DESCRIPTION_IS_REQUIRED),
})

const amountValidationSchema = yup.object().shape({
  amount: yup
    .string()
    .required(validations.AMOUNT_IS_REQUIRED)
    .notOneOf(['0.00'], 'Amount must be greater than 0'),
  description: yup
    .string()
    .min(1, validations.DESCRIPTION_MIN)
    // .matches(
    //   /^[\p{L}\p{N}\s\u2600-\u26FF\u2700-\u27BF\u1F300-\u1F5FF\u1F600-\u1F64F\u1F680-\u1F6FF\u1F700-\u1F77F\u1F780-\u1F7FF\u1F800-\u1F8FF\u1F900-\u1F9FF\u1FA00-\u1FA6F\u1FA70-\u1FAFF]*$/u,
    //   'Only letters, numbers, and spaces are allowed',
    // )
    .matches(/^[\p{L}\p{N}\s\p{Emoji}]*$/u, 'Only letters, numbers, and spaces are allowed')
    // .matches(/^[a-zA-Z0-9\s]*$/, 'Only letters, numbers, and spaces are allowed')
    .required(validations.DESCRIPTION_IS_REQUIRED),
})

const stepOneValidationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(PHONE_REG_EXP, validations.PHONE_NUMBER_IS_NOT_VALID)
    .required(validations.PHONE_NUMBER_IS_REQUIRED),
  country_code: yup.string().matches(/5999/, validations.COUNTRY_IS_NOT_VALID),
  email: yup
    .string()
    .email(validations.PLEASE_ENTER_VALID_EMAIL)
    .required(validations.EMAIL_ADDRESS_IS_REQUIRED),
  password: yup
    .string()
    .required(validations.PASSWORD_REQUIRED)
    .matches(PASSWORD_REG_EXP, validations.REGEX_FOR_PASS_VALIDATION),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], validations.CONFIRM_PASSWORD)
    .required(),
  terms: yup.bool(),
})
const stepTwoValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, validations.FIRST_NAME_MIN)
    .max(50, validations.FIRST_NAME_MAX)
    .required(validations.FIRST_NAME_REQ),
  lastName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, validations.LAST_NAME_MIN)
    .max(50, validations.LAST_NAME_MAX)
    .required(validations.LAST_NAME_REQ),
  birthDate: yup.string().required(validations.DATE_OF_BIRTH_IS_REQUIRED),
})
const signInValidationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(PHONE_REG_EXP, validations.PHONE_NUMBER_IS_NOT_VALID)
    .required(validations.PHONE_NUMBER_IS_REQUIRED),
  country_code: yup.string().matches(/5999/, validations.COUNTRY_IS_NOT_VALID),
  password: yup.string().required(validations.PASSWORD_REQUIRED),
})

const updatePasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required(validations.PASSWORD_REQUIRED)
    .matches(PASSWORD_REG_EXP, validations.REGEX_FOR_PASS_VALIDATION),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], validations.CONFIRM_PASSWORD)
    .required(),
})
const updatePasswordPublicValidationSchema = yup.object().shape({
  currentPassword: yup.string().required(validations.PASSWORD_REQUIRED),
  password: yup
    .string()
    .required(validations.PASSWORD_REQUIRED)
    .matches(PASSWORD_REG_EXP, validations.REGEX_FOR_PASS_VALIDATION),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], validations.CONFIRM_PASSWORD)
    .required(),
})

const updateProfileValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, validations.FIRST_NAME_MIN)
    .max(50, validations.FIRST_NAME_MAX)
    .required(validations.FIRST_NAME_REQ),
  lastName: yup
    .string()
    .min(2, validations.LAST_NAME_MIN)
    .max(50, validations.LAST_NAME_MAX)
    .required(validations.LAST_NAME_REQ),
  birthDate: yup.string().required(validations.DATE_OF_BIRTH_IS_REQUIRED),
  mobileNumber: yup
    .string()
    .matches(PHONE_REG_EXP, validations.PHONE_NUMBER_IS_NOT_VALID)
    .required(validations.PHONE_NUMBER_IS_REQUIRED),
  country_code: yup.string().matches(/5999/, validations.COUNTRY_IS_NOT_VALID),
  email: yup
    .string()
    .email(validations.PLEASE_ENTER_VALID_EMAIL)
    .required(validations.EMAIL_ADDRESS_IS_REQUIRED),
})
const remittanceSenderAddressValidationSchema = yup.object().shape({
  address: yup.string().min(1, 'Address is required').required('Address is required'),
})
const addRemittanceValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, validations.FIRST_NAME_MIN)
    .max(50, validations.FIRST_NAME_MAX)
    .required(validations.FIRST_NAME_REQ),
  lastName: yup
    .string()
    .min(2, validations.LAST_NAME_MIN)
    .max(50, validations.LAST_NAME_MAX)
    .required(validations.LAST_NAME_REQ),
  city: yup.string().required('City is required'),
})

const addBankDetailValidationSchema = yup.object().shape({
  accountNo: yup
    .string()
    .matches(ONLY_NUMBERS, 'Only numbers are allowed')
    .required('Account Number is required'),
  accountName: yup
    .string()
    .matches(ONLY_CHARACTERS, 'Only Characters are allowed')
    .required('Account Holder Name is required'),
})

//////////////////////////////MERCHANT/////////////////////////////////////////////////
const merchantStepOneValidationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .matches(PHONE_REG_EXP, validations.PHONE_NUMBER_IS_NOT_VALID)
    .required(validations.PHONE_NUMBER_IS_REQUIRED),
  country_code: yup.string().matches(/5999/, validations.COUNTRY_IS_NOT_VALID),
  businessEmail: yup
    .string()
    .email(validations.PLEASE_ENTER_VALID_EMAIL)
    .required(validations.EMAIL_ADDRESS_IS_REQUIRED),
  password: yup
    .string()
    .required(validations.PASSWORD_REQUIRED)
    .matches(PASSWORD_REG_EXP, validations.REGEX_FOR_PASS_VALIDATION),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], validations.CONFIRM_PASSWORD)
    .required(),
})
const merchantStepTwoValidationSchema = yup.object().shape({
  companyName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Company Name can only contain letters and spaces')
    .min(2, validations.COMPANY_NAME_MIN)
    .max(50, validations.COMPANY_NAME_MAX)
    .required(validations.COMPANY_NAME_REQ),
  chamberOfCommerceRegistrationNumber: yup
    .number()
    .min(1)
    .required('Chamber of Commerce Registration Number is required'),
  taxID: yup.number().min(1).required('Tax ID is required'),
  isCompanyRegistered: yup.boolean().default(true), // Ensure this is a boolean
})
const merchantStepTwoNotRegisteredValidationSchema = yup.object().shape({
  companyName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Company Name can only contain letters and spaces')
    .min(2, validations.COMPANY_NAME_MIN)
    .max(50, validations.COMPANY_NAME_MAX)
    .required(validations.COMPANY_NAME_REQ),
  PersonalCribNumber: yup.number().min(1).required('Personal Crib Number is required'),
  isCompanyRegistered: yup.boolean().default(false), // Ensure this is a boolean
})

const poolInValidationSchema = yup.object().shape({
  poolName: yup.string().required(validations.POOL_NAME_REQUIRED),
  purpose: yup.string().required(validations.POOL_PURPOSE_REQUIRED),
  deadLine: yup.string().required(validations.POOL_DEADLINE_REQUIRED),
})

export {
  poolInValidationSchema,
  merchantStepOneValidationSchema,
  merchantStepTwoValidationSchema,
  merchantStepTwoNotRegisteredValidationSchema,
  addBankDetailValidationSchema,
  addRemittanceValidationSchema,
  remittanceSenderAddressValidationSchema,
  mobileValidationSchema,
  stepOneValidationSchema,
  signInValidationSchema,
  stepTwoValidationSchema,
  updatePasswordValidationSchema,
  amountValidationSchema,
  topUpValidationSchema,
  requestAmountValidationSchema,
  updateProfileValidationSchema,
  cashOutAmountValidationSchema,
  updatePasswordPublicValidationSchema,
  addBankValidationSchema,
}
