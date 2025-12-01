import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { AlignItemType, FontWeight, JustifyContentType } from '@src/@types/enum';
import colors from '@src/constants/colors';
import icons from '@src/assets/icons';
import fontSize from '@src/constants/fontSize';

const Header = ({ leftIcon, rightIcon, title, logo }: IHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.sideIcon}>
        {leftIcon ? (
          leftIcon
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={30} color={colors.WHITE} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        {logo ? (
          <View style={styles.headerImageStyle}>
            <Image style={styles.logoText} resizeMode="stretch" source={icons.LOGO_TEXT} />
          </View>
        ) : (
          <Text maxFontSizeMultiplier={1.4} style={styles.title}>
            {title}
          </Text>
        )}
      </View>

      <View style={styles.sideIcon}>{rightIcon ? rightIcon : <View style={{ width: 30 }} />}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 96 : 65,
    flexDirection: 'row',
    alignItems: AlignItemType.FlexEnd,
    justifyContent: JustifyContentType.SpaceBetween,
    paddingHorizontal: 4,
    backgroundColor: colors.HEADER,
    paddingBottom: 12,
  },
  sideIcon: {
    width: 40,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
  center: {
    flex: 1,
    height: 30,
    alignItems: AlignItemType.Center,
    justifyContent: JustifyContentType.Center,
  },
  title: {
    fontSize: fontSize.XLARGE,
    fontWeight: FontWeight.W600,
    color: colors.WHITE,
  },
  headerImageStyle: {
    justifyContent: JustifyContentType.Center,
    alignItems: AlignItemType.Center,
  },
  logoText: {
    width: 45,
    height: 25,
  },
});
