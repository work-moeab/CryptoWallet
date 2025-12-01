import { AlignItemType, FontWeight } from '@src/@types/enum'
import colors from '@src/constants/colors'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const requirements = checkPasswordRequirements(password)

  return (
    <View style={styles.container}>
      <View style={styles.requirementContainer}>
        <Text
          maxFontSizeMultiplier={1.4}
          style={[styles.requirement, requirements.length ? styles.valid : styles.invalid]}>
          * At least 8 characters
        </Text>
      </View>
      <View style={styles.requirementContainer}>
        <Text
          maxFontSizeMultiplier={1.4}
          style={[styles.requirement, requirements.uppercase ? styles.valid : styles.invalid]}>
          * At least 1 uppercase letter
        </Text>
      </View>
      <View style={styles.requirementContainer}>
        <Text
          maxFontSizeMultiplier={1.4}
          style={[styles.requirement, requirements.lowercase ? styles.valid : styles.invalid]}>
          * At least 1 lowercase letter
        </Text>
      </View>
      <View style={styles.requirementContainer}>
        <Text
          maxFontSizeMultiplier={1.4}
          style={[styles.requirement, requirements.number ? styles.valid : styles.invalid]}>
          * At least 1 number
        </Text>
      </View>
      <View style={styles.requirementContainer}>
        <Text
          maxFontSizeMultiplier={1.4}
          style={[styles.requirement, requirements.special ? styles.valid : styles.invalid]}>
          * At least 1 special character (!&@#$^*?_~%)
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  requirementContainer: {
    flexDirection: 'row',
    alignItems: AlignItemType.Center,
    marginVertical: 1,
  },
  requirement: {
    fontWeight: FontWeight.W400,
  },
  valid: {
    color: colors.GREEN,
  },
  invalid: {
    color: colors.RED,
  },
})

// Helper function to check password requirements
const checkPasswordRequirements = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!&@#$^*?_~%]/.test(password),
  }
}

export default PasswordStrengthIndicator
