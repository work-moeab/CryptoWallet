import icons from '@src/assets/icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const CardImage = ({ item, onPress }: ICardImageProps) => {
  // console.log('these are the items ', item);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(item)}>
      <TouchableOpacity style={styles.imgDiv} testID="click">
        <Image source={item.image ? { uri: item.image } : icons.DUMMY_PICTURE} style={styles.img} />
      </TouchableOpacity>
      <View style={styles.content}>
        {(item.firstName || item.lastName) && (
          <Text maxFontSizeMultiplier={1.4} style={styles.title}>
            {item.firstName} {item.lastName}
          </Text>
        )}
        {item.username && (
          <Text maxFontSizeMultiplier={1.4} style={styles.title}>
            {item.username}
          </Text>
        )}
        <Text maxFontSizeMultiplier={1.4} style={styles.title}>
          {item.phoneNumber}
        </Text>
        {item.referredDate && (
          <Text maxFontSizeMultiplier={1.4} style={styles.title}>
            Reffered On: {item.referredDate}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardImage;
