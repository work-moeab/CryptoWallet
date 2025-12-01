import colors from '@src/constants/colors'
import React, { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import BottomSheet from '../bottomSheet'
import { Camera, ImageIcon, Trash2, X } from 'lucide-react-native'
import { messages } from '@src/constants/messages'
import { IUploadImageBottomSheetProps } from '@src/@types/components/bottomSheet'

const UploadImageBottomSheet: FC<IUploadImageBottomSheetProps> = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  onDelete,
  onCamera,
  onGallery,
}) => {
  return (
    <BottomSheet
      isBottomSheetOpen={isBottomSheetOpen}
      setIsBottomSheetOpen={setIsBottomSheetOpen}
      sheetStyle={styles.sheetContainer}>
      <View style={styles.contentScroll}>
        <TouchableOpacity style={styles.closeButton} onPress={setIsBottomSheetOpen}>
          <X color={colors.WHITE} size={20} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={onCamera} style={styles.imageButton}>
            <Text maxFontSizeMultiplier={1.4} style={styles.imageButtonText}>
              {messages.TAKE_PHOTO}
            </Text>
            <Camera size={25} color={colors.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onGallery} style={styles.imageButton}>
            <Text maxFontSizeMultiplier={1.4} style={styles.imageButtonText}>
              {messages.CHOOSE_PHOTO}
            </Text>
            <ImageIcon size={25} color={colors.BLACK} />
          </TouchableOpacity>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.imageButton}>
              <Text
                maxFontSizeMultiplier={1.4}
                style={{ ...styles.imageButtonText, ...{ color: colors.RED } }}>
                {messages.DELETE_PHOTO}
              </Text>
              <Trash2 size={25} color={colors.RED} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BottomSheet>
  )
}

export default UploadImageBottomSheet
