import { JustifyContentType, Modals } from '@src/@types/enum';
import icons from '@src/assets/icons';
import Background from '@src/components/background';
import colors from '@src/constants/colors';
import { getAxiosError, showToast } from '@src/helper/helper';
import { RootState } from '@src/redux/store';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import * as RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Menu, RefreshCcw } from 'lucide-react-native';
import Card from '@src/components/Card';
import { NavigationProps } from '@src/@types/navigation';
import { useAPIService } from '@src/context/APIServiceContext';

const QRCodeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const apiService = useAPIService();
  const [link, setLink] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(() => {
  getQrCode();
  }, []);

  const getQrCode = async () => {
    setLoading(true)
    try {

    } catch (error: unknown) {
      const { message } = getAxiosError(error);
      setLoading(false)
    }
  };

  const onShare = async () => {
    if (link) {
      try {
        const filename = 'share.png';
        const filepath = `file://${RNFS.CachesDirectoryPath}/${filename}`;
        await RNFS.writeFile(filepath, link, {
          encoding: 'base64',
        });
        const options = {
          title:'Share QR',
          // message: 'SHARE_YOUR_QR_WITH_OTHERS',
          message: '',
          url: filepath,
          type: 'image/png',
          showAppsToView: true,
          filename: 'Qr Code',
          saveToFiles: false,
        };

        await Share.open(options);
      } catch (error) {
        if (error) return;
      }
    }
  };
  const onDownload = async () => {
    if (link) {
      try {
        const filename = `CryptoQr${Date.now()}.png`;
        const filepath = `file://${
          Platform.OS === 'android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath
        }/${filename}`;
        await RNFS.writeFile(filepath, link, {
          encoding: 'base64',
        });
        showToast('QR_SAVED_IN_DOWNLOADS');
      } catch (error) {
        if (error) return;
      }
    }
  };

  return (
    <Background
      useLinear
      header={{
        title: 'MY_QR_CODE',
        leftIcon: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Menu size={25} color={colors.WHITE} />
          </TouchableOpacity>
        ),
      }}>
        <Card cardStyle={styles.mainContainer}>
          {userInfo ? (
            <>
              <View style={styles.imgInnerBorder}>
                <Image
                  source={
                    userInfo?.userProfilePicture
                      ? { uri: userInfo?.userProfilePicture }
                      : icons.DUMMY_PICTURE
                  }
                  style={styles.img}
                />
              </View>
              <Text maxFontSizeMultiplier={1.4} style={styles.text}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
              <Text maxFontSizeMultiplier={1.4} style={styles.textMobNum}>
                {userInfo.phoneNumber}
              </Text>
              {link ? (
                <Image
                  style={{ height: 250, width: 250 }}
                  onLoadEnd={() => 
                  setLoading(false)
                    // handleModalClose(Modals.LoaderModal, dispatch)
                  }
                  source={{ uri: `data:image/png;base64,${link}` }}
                />
              ) : (
                <View style={styles.retryContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      getQrCode();
                    }}>
                    <RefreshCcw size={30} color={colors.BLACK} />
                  </TouchableOpacity>
                </View>
              )}
              {link && (
                <View style={styles.actionsButtons}>
                  <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={onDownload}>
                    <Text
                      maxFontSizeMultiplier={1.4}
                      style={{ ...styles.buttonText, color: colors.WHITE }}>
                      Download
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      ...styles.button,
                      backgroundColor: colors.WHITE,
                      borderWidth: 1.5,
                      borderColor: colors.HEADER,
                    }}
                    onPress={onShare}>
                    <Text
                      maxFontSizeMultiplier={1.4}
                      style={{ ...styles.buttonText, color: colors.HEADER }}>
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <ActivityIndicator color={colors.BLACK} size="large" />
          )}
        </Card>

    </Background>
  );
};

export default QRCodeScreen;
