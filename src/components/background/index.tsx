import colors from '@src/constants/colors';
import { FC } from 'react';
import React, { View, StatusBar, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Header from '../header';
import { ICustomBackGroundProps } from '@src/@types/components/backgroundComponent';
import { StatusBarStyle } from '@src/@types/enum';

export const IOS_PADDING = 20;

const Background: FC<ICustomBackGroundProps> = ({
  children,
  statusBarColor = StatusBarStyle.light,
  statusBarBGColor = colors.HEADER,
  avoidKeyboard = false,
  showsVerticalScrollIndicator = false,
  header,
  containerStyle,
}) => {
  const Container = avoidKeyboard ? KeyboardAwareScrollView : View;
  return (
    <>
      <StatusBar barStyle={statusBarColor} backgroundColor={statusBarBGColor} />
      {header ? (
        <Header
          title={header.title}
          leftIcon={header.leftIcon}
          rightIcon={header.rightIcon}
          logo={header.logo}
        />
      ) : (
        <View />
      )}
      <Container
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ ...styles.mainContainer, ...containerStyle }}
        style={{ ...styles.mainContainer, ...containerStyle }}>
            <View style={styles.wrapper}>

                <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
            </View>
      </Container>
    </>
  );
};
export default Background;
