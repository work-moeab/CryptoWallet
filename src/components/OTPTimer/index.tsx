// OtpTimer.tsx
import { OtpTimerProps } from '@src/@types/components/otp'
import { AlignItemType } from '@src/@types/enum'
import colors from '@src/constants/colors'
import fontSize from '@src/constants/fontSize'
import { useOtpTimer } from '@src/hooks/useOTPTimer'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const OtpTimer: React.FC<OtpTimerProps> = ({ initialTimer, resendLimit, onResend, onTimeout }) => {
  const [resendCount, setResendCount] = useState<number>(1)
  const { timer, resetTimer } = useOtpTimer({
    initialTimer,
    onTimeout: () => {
      if (onTimeout) onTimeout()
    },
  })

  const handleResend = async () => {
    if (resendCount < resendLimit) {
      await onResend(resendCount + 1)
      resetTimer()
      setResendCount((prev) => prev + 1)
    }
  }

  return (
    <View style={{ alignItems: 'center' }}>
      {resendCount >= resendLimit ? (
        <Text
          maxFontSizeMultiplier={1.4}
          style={{
            color: colors.BLACK,
            fontSize: fontSize.TEXT_BASE,
          }}>
          Limit exceeded. Please try again later.
        </Text>
      ) : timer === 0 ? (
        <View style={{ flexDirection: 'row', alignItems: AlignItemType.Center, gap: 4 }}>
          <Text maxFontSizeMultiplier={1.4} style={{ color: colors.BLACK }}>
            I didn't receive the code.
          </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text maxFontSizeMultiplier={1.4} style={{ color: colors.HEADER }}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: AlignItemType.Center, gap: 4 }}>
          <Text
            maxFontSizeMultiplier={1.4}
            style={{
              fontSize: fontSize.TEXT_BASE,
              color: colors.BLACK,
            }}>
            Resend code in
          </Text>
          <Text
            maxFontSizeMultiplier={1.4}
            style={{
              fontSize: fontSize.TEXT_BASE,
              color: colors.HEADER,
            }}>
            {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </Text>
        </View>
      )}
    </View>
  )
}

export default OtpTimer
