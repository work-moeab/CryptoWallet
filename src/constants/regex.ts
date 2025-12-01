export const ONLY_CHARACTERS = /^[A-Z ]+$/
export const ONLY_NUMBERS = /^\d+$/
export const PHONE_REG_EXP = /^(?:\+5999)?(\d{7})$/
export const FULL_PHONE_REG_EXP = /^(\+5999\d{7})$/
export const SPECIAL_CHR_REG_EXP = /^[A-Za-z]+$/
export const JOB_CHR_REG_EXP = /^[A-Za-z -]+$/
export const FULL_NAME_WITH_SPACES = /^[A-Za-z ]+$/
export const PASSWORD_REG_EXP = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=.*[!&@#$^*?_~%]).{8,}$/
export const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
