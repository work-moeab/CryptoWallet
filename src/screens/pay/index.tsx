import { useNavigation } from '@react-navigation/native';
import {
  AlignItemType,
  FontWeight,
  JustifyContentType,
  Modals,
  TextAlignType,
} from '@src/@types/enum';
import loader from '@src/assets/loader';
import Card from '@src/components/Card';
import Background from '@src/components/background';
import Divider from '@src/components/divider';
import colors from '@src/constants/colors';
import { FULL_PHONE_REG_EXP } from '@src/constants/regex';
import { getAxiosError,  showToast } from '@src/helper/helper';
import useContacts from '@src/hooks/useContactsHook';
import { useAppSelector } from '@src/redux/hooks';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Linking,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { check, PERMISSIONS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import CardImage from './CardImage';
import styles from './styles';
import useFetchHomePageData from '@src/hooks/useFetchHomePageData';
import icons from '@src/assets/icons';
import {
  Camera,
  useCodeScanner,
  useCameraPermission,
  useCameraDevice,
  Code,
} from 'react-native-vision-camera';
import { NavigationProps } from '@src/@types/navigation';
import { useAPIService } from '@src/context/APIServiceContext';
import SearchFilter from '@src/components/common/searchFilter';
import AllContacts from '@src/components/common/allContactList';
import CustomAlertModal from '@src/components/modal/alertModal';

const Pay = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const apiService = useAPIService();
  const [search, setSearch] = useState<string>('');
  const [searchList, setSearchList] = useState<UserContact[]>([]);
  const { userContacts } = useAppSelector((state) => state.user);
  const { contacts } = useContacts();
  const {  } = useFetchHomePageData();
  const [loadingChipContacts, setLoadingChipContacts] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<boolean | null>(null);
  const [cameraScanner, setCameraScanner] = useState<boolean>(false);
  const [scanningEnabled, setScanningEnabled] = useState<boolean>(true);

  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();
  const [scan, setScan] = useState<boolean>(false);
  const scanTimeout = useRef(false);
  let timeout :any;
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (scanningEnabled) {
        handleScanData(codes);
      }
    },
  });

  useEffect(() => {
    // Clean up timeout on unmount
    return () => {
      clearTimeout(timeout)
    };
  }, []);

  const handleScan = async () => {
    setScan(!scan);
    setCameraScanner(!cameraScanner);
    timeout = setTimeout(() => {
      if (!hasPermission) return;
      if (scanTimeout.current) return;
      setScan(false);
      setCameraScanner(false);
    }, 8000);
  };

  const handlePermissions = () => {
    setCameraScanner(false);
    setScan(false);
    Linking.openSettings();
  };

  const handleScanData = async (codes: Code[]) => {
    setLoading(true)
    setScanningEnabled(false);
    try {
      const value = codes?.[0]?.value?.trim();
      if (!value) throw new Error('Invalid QR');
      if (/https?:\/\/.+\.(app\.link|bnc\.lt)\//i.test(value)) {
        setLoading(false)
        setScan(false);
        setCameraScanner(false);
        setScanningEnabled(true);
        return;
      }
    } catch (err) {
      setLoading(false)
      const { message } = getAxiosError(err);
    } finally {
      // allow rescans after a short delay if you like
      timeout = setTimeout(() => {
        setLoading(false)
        setScanningEnabled(true);

      }, 8000);
    }
  };

  useEffect(() => {
    const checkContactsPermission = async () => {
      let permission;
      // Adjust permission checking based on your platform needs
      if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.CONTACTS;
      } else {
        permission = PERMISSIONS.ANDROID.READ_CONTACTS;
      }

      const status = await check(permission);
      setPermission(status === 'granted');
    };

    checkContactsPermission();
  }, []);


  useEffect(() => {
    if (search !== '') {
      if (!permission) {
        if (FULL_PHONE_REG_EXP.test(search)) {
          handleSearch();
        }
      } else {
        // Combine both `recentContacts` and `contacts` for filtering
        const allContacts = [
          ...(userContacts.recentContacts || []),
          ...(userContacts.contacts || []),
        ];
        const filterContacts = allContacts.filter((item) => item?.phoneNumber.includes(search));
        setSearchList(filterContacts);

        if (FULL_PHONE_REG_EXP.test(search)) {
          handleSearch();
        }
      }
    } else {
      setSearchList([]);
    }
  }, [search]);

  const handleSearch = async () => {
  };

  return (
    <Background
      swipeAbleScreens
      header={{
        title: 'Pay',
      }}>
      <View style={styles.container}>
        {!cameraScanner && (
          <Card cardStyle={styles.cardStyle}>
            <SearchFilter
              onChangeText={(text: string) => setSearch(text)}
              onPress={handleSearch}
              value={search}
            />

            {!permission && (
              <>
                <View
                  style={{
                    height: 20,
                    width: '100%',
                    justifyContent: JustifyContentType.Center,
                  }}>
                  {searchList.length > 0 ? (
                    <FlatList
                      data={searchList}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <CardImage
                          item={item as ICardImageItemProps}
                          onPress={(item: ICardImageItemProps) => {
                          //   navigation.navigate(AMOUNT_DETAIL, {
                          //     ...item,
                          //     profileImageUrl: item?.image,
                          //     isQr: false,
                          //   });
                          }}
                        />
                      )}
                      style={{ marginBottom: 10 }}
                    />
                  ) : (
                    <></>
                  )}
                </View>

                <View>
                  <Text
                    maxFontSizeMultiplier={1.4}
                    style={{ ...styles.error, color: colors.BLACK }}>
                    Contact permissions is required to see your contact list
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      Linking.openSettings();
                    }}>
                    <Text maxFontSizeMultiplier={1.4} style={styles.error}>
                      Click here to go to settings and allow permission manually
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {permission && (
              <>
                {loadingChipContacts || searchLoading ? (
                  // Show the loader view
                  <View style={styles.loaderContainer}>
                    <LottieView autoPlay style={styles.loader} source={loader.LOADER_JSON} />
                  </View>
                ) : search !== '' ? (
                  // Show the search results view
                  <View
                    style={{
                      minHeight: 130,
                      maxHeight: 400,
                      width: '100%',
                      justifyContent: JustifyContentType.Center,
                    }}>
                    {searchList.length > 0 ? (
                      <FlatList
                        data={searchList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <CardImage
                            item={item as ICardImageItemProps}
                            onPress={(item: ICardImageItemProps) => {
                              // navigation.navigate(AMOUNT_DETAIL, {
                              //   ...item,
                              //   profileImageUrl: item?.image,
                              //   isQr: false,
                              // });
                            }}
                          />
                        )}
                        style={{ marginBottom: 10 }}
                      />
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          alignItems: AlignItemType.Center,
                          marginTop: 20,
                        }}>
                        <Text
                          maxFontSizeMultiplier={1.4}
                          style={{
                            textAlign: TextAlignType.Center,
                            color: colors.BLACK,
                            fontWeight: FontWeight.W500,
                          }}>
                          No Results
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
                    {/* Show all contacts */}
                    <AllContacts
                      recentList={userContacts.contacts}
                      onPress={(item: UserContact) => {
                        // navigation.navigate(AMOUNT_DETAIL, {
                        //   ...item,
                        //   profileImageUrl: item?.image,
                        //   isQr: false,
                        // });
                      }}
                    />
                  </View>
                )}
              </>
            )}
          </Card>
        )}
        {search === '' && (
          <>
            {!cameraScanner && (
              <View style={styles.dividerContainer}>
                <Divider width={140} />
                <Text maxFontSizeMultiplier={1.4} style={styles.orText}>
OR
                </Text>
                <Divider width={140} />
              </View>
            )}
            <View style={{ marginBottom: 10 }}>
              {scan && device ? (
                <>
                  <View style={styles.scannerContainer}>
                    {!hasPermission ? (
                      <View>
                        <CustomAlertModal
                          visible={!hasPermission}
                          cancel={() => {
                            setScan(false);
                            setCameraScanner(false);
                            setLoading(false)
                          }}
                          cancelButtonText={'Close'}
                          title={'Crypto Wallet'}
                          message={'Camera permissions is required for this action'}
                          confirm={handlePermissions}
                          confirmButtonText={'Settings'}
                          confirmButtonColor={'blue'}
                          cancelButtonColor={'gray'}
                        />
                      </View>
                    ) : (
                      <>
                        <Camera
                          style={StyleSheet.absoluteFill}
                          device={device}
                          isActive={true}
                          codeScanner={codeScanner}
                        />
                        <LottieView autoPlay style={styles.scanner} source={loader.SCANNER_JSON} />
                      </>
                    )}
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleScan}
                  style={styles.scannerButton}>
                  <Image
                    source={icons.QR_CODE}
                    tintColor={colors.WHITE}
                    style={{ height: 80, width: 80 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </Background>
  );
};

export default Pay;
