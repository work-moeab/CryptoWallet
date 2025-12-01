import { FontWeight, JustifyContentType } from '@src/@types/enum'
import icons from '@src/assets/icons'
import colors from '@src/constants/colors'
import { validateImageUri } from '@src/helper/helper'
import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

export const PersonDetail = ({
  title = 'John',
  image,
  phone = '31241231231',
}: {
  title :string
  image:any
  phone :string
}) => {
  return (
    <View style={styles.imgContainer}>
      <TouchableOpacity
        style={styles.imgTouch}>
        <Image
          testID="main-image"
          source={validateImageUri(image || '') ? { uri: image } : icons.DUMMY_PICTURE}
          style={styles.mainImage}
        />
      </TouchableOpacity>

      <View style={styles.imgDetails}>
        <Text maxFontSizeMultiplier={1.4} style={styles.imageDetails}>
          {title}
        </Text>
        <Text maxFontSizeMultiplier={1.4} style={styles.imageDetails}>
          {phone}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 15,
  },
  imgTouch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: colors.BLACK,
    borderWidth: 0.1,
    overflow: 'hidden',
  },
  imgDetails: { justifyContent: JustifyContentType.Center, marginLeft: 10 },
  imageDetails: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: FontWeight.W500,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
})
