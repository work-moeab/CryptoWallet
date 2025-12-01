import { AlignItemType, Modals } from '@src/@types/enum'
import CustomButton from '@src/components/button'
import React, { FC } from 'react'
import { Modal, Text, View, Pressable } from 'react-native'
import styles from './styles'
import { useDispatch } from 'react-redux'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'
import { IAlertModal } from '@src/@types/components/modal'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const CustomAlertModal: FC<IAlertModal> = ({
  visible,
  cancel,
  cancelButtonText = '',
  confirm,
  confirmButtonText = '',
  title = 'CHIP',
  message = 'Are you sure',
  cancelButtonColor = '',
  confirmButtonColor = '',
}) => {
  const dispatch = useDispatch()
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => {
        cancel()
        // handleModalClose(Modals.AlertModal, dispatch)
      }}>
      <AnimatedPressable
        style={styles.backdrop}
        onPress={(event) =>
          event.target === event.currentTarget && cancel()
        }>
        <Animated.View entering={BounceIn} exiting={BounceOut} style={[styles.bottomSheet]}>
          <View style={{ alignItems: AlignItemType.Center, gap: 20 }}>
            <View style={{ alignItems: AlignItemType.Center, gap: 10, marginBottom: 5 }}>
              <Text maxFontSizeMultiplier={1.4} style={styles.title}>
                {title}
              </Text>
              <Text maxFontSizeMultiplier={1.4} style={styles.description}>
                {message}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title={cancelButtonText}
              testID="cancel"
              activeOpacity={0.7}
              buttonStyle={{

                zIndex: 10,
              }}
              onPress={cancel}
            />
            <CustomButton
              title={confirmButtonText}
              testID="confirm"
              onPress={confirm}
              activeOpacity={0.7}
              buttonStyle={{
                zIndex: 10,
              }}
            />
          </View>
        </Animated.View>
      </AnimatedPressable>
    </Modal>
  )
}

export default CustomAlertModal
