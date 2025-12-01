import { useNavigation } from '@react-navigation/native';
import icons from '@src/assets/icons';
import Background from '@src/components/background';
import CustomButton from '@src/components/button';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { RootState } from '@src/redux/store';
import { useSelector } from 'react-redux';
import colors from '@src/constants/colors';
import { AlignSelfType } from '@src/@types/enum';
import { NavigationProps } from '@src/@types/navigation';

const Profile = () => {
  const navigation = useNavigation<NavigationProps>();
  const { userInfo } = useSelector((state: RootState) => state.user);
  return (
    <Background
      header={{
        title: 'PROFILE',
      }}>
      <View style={styles.profileContainer}>
        <View style={styles.imgBorder}>
          <TouchableOpacity
            style={styles.imgInnerBorder}>
            <Image
              source={
                userInfo.userProfilePicture
                  ? { uri: userInfo.userProfilePicture }
                  : icons.DUMMY_PICTURE
              }
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.innerContainer,
          }}>
          {userInfo.email && userInfo.lastName && userInfo.firstName ? (
            <View style={{ ...styles.textContainer }}>
              <View style={styles.underlineTextContainer}>
                <Text maxFontSizeMultiplier={1.4} style={{ ...styles.text }}>
                  {userInfo.firstName} {userInfo.lastName}
                </Text>
                <View style={{ gap: 1 }}>
                  <View style={styles.underline} />
                  <View style={styles.underline} />
                </View>
              </View>
              <Text maxFontSizeMultiplier={1.4} style={{ ...styles.text }}>
                {userInfo.email}
              </Text>

              <Text maxFontSizeMultiplier={1.4} style={{ ...styles.text }}>
                {userInfo.phoneNumber}
              </Text>
            </View>
          ) : (
            <View style={{ padding: 30 }}>
              <ActivityIndicator size="large" color={colors.BLACK} />
            </View>
          )}
          <CustomButton
            title={'EDIT_PROFILE'}
            testID="button"
            activeOpacity={0.7}
            buttonStyle={{
              zIndex: 10,
              alignSelf: AlignSelfType.Center,
            }}
            onPress={() =>{}}
          />
        </View>
      </View>
    </Background>
  );
};

export default Profile;
