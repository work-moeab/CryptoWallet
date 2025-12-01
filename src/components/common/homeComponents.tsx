import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  IOptionCardProps,
} from '@src/@types/common';
import {
  AlignItemType,
  AlignSelfType,
  FilterTransactons,
  FontWeight,
  JustifyContentType,
  MerchantHomeFilterTransactons,
  Modals,
  TextAlignType,
} from '@src/@types/enum';
import icons from '@src/assets/icons';
import colors from '@src/constants/colors';
import {
  formatNumberAsString,
  showToast,
} from '@src/helper/helper';
import { AppDispatch, RootState } from '@src/redux/store';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../Card';
import { Circle, Filter, X } from 'lucide-react-native';
import useFetchHomePageData from '@src/hooks/useFetchHomePageData';
import { NavigationProps } from '@src/@types/navigation';
import { useAPIService } from '@src/context/APIServiceContext';

const FilterRenderItem = ({
  item,
  dispatch,
  selected,
}: {
  item: any;
  dispatch: AppDispatch;
  selected: any;
}) => {
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.7}
        onPress={() => {
          // dispatch(setFilterategory(item.value));
        }}
        testID={item.value}>
        {selected === item.value ? (
          <Circle size={20} color={colors.HEADER} fill={colors.HEADER} />
        ) : (
          <Circle size={20} color={colors.HEADER} />
        )}
        <Text
          maxFontSizeMultiplier={1.4}
          style={selected ? [styles.itemText, { color: colors.HEADER }] : styles.itemText}>
          {item.value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const TransactionHistoryCard: FC<any> = ({
  onPressFilterButton,
  modalVisible,
  setModalVisible,
  transactionCategory,
  refresh,
  merchant = false,
}) => {
  const dispatch = useDispatch();
  const apiService = useAPIService();
  const { userInfo,  } = useSelector((state: RootState) => state.user);
  const {  } = useFetchHomePageData();
  const [loading, setLoading] = useState<boolean>(false);
  const [requestModal, setRequestModal] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(undefined);
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  const {  fetchUserData } = useFetchHomePageData();
  let timeout:any
  const cooldownRef = useRef(false);
  const TIME_OUT = 20000;

  let homeTransactionList:any = []

  useEffect(() => {
    // Clean up timeout on unmount
    return () => {
      clearTimeout(timeout)
      cooldownRef.current = false;
    };
  }, []);

  const getTransactions = async () => {
    // setLoading(true);

    //   await fetchHomeTransactionList(category === 'All' ? '' : category).finally(() => {
    //     setLoading(false);
      // });
  };

  const getDatasOnFocus = async () => {
    if (!cooldownRef.current) {
      cooldownRef.current = true;
      timeout = setTimeout(() => {
        cooldownRef.current = false;
      },TIME_OUT );
      try {
          await fetchUserData();
      } catch (error) {
        if (error) return;
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getDatasOnFocus();
    }, [])
  );

  useEffect(() => {
    getTransactions();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    // return renderRequestItem(item, handleOpenRequest);
  };
  const handleOpenRequest = (item: any) => {
  };

  return (
    <View style={{ ...styles.transactionHistoryCardContainer, padding: merchant ? 0 : 15 }}>
      {/* <TransactionHandler
        refreshTransactions={() => getTransactions()}
        requestModal={requestModal}
        setRequestModal={setRequestModal}
        transactionModal={transactionModal}
        setTransactionModal={setTransactionModal}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
      /> */}
      <Card
        cardStyle={{
          ...styles.cardStyle,
          width: '100%',
          minHeight: 200,
          marginBottom:  20,
        }}>
          <View style={styles.filterIcon}>
            <TouchableOpacity
              testID="billTransaction"
              style={styles.filterBtn}
              onPress={onPressFilterButton}
              activeOpacity={1}>
              <Filter size={20} color={colors.BLACK} />
            </TouchableOpacity>
          </View>
          <Text maxFontSizeMultiplier={1.4} style={styles.categoryText}>
            {/* {category} */}
          </Text>
          <View>
            {homeTransactionList.length === 0 && !loading && (
              <Text
                maxFontSizeMultiplier={1.4}
                style={{ color: 'black', textAlign: TextAlignType.Center, paddingVertical: 30 }}>
                {'NO_TRANSACTION_FOUND'}
              </Text>
            )}
          </View>
        {loading ? (
          <View
            style={{
              alignItems: AlignItemType.Center,
              justifyContent: JustifyContentType.Center,
              paddingVertical: 30,
            }}>
            <ActivityIndicator size="large" color={colors.BLACK} />
          </View>
        ) : (
              <View>{homeTransactionList.map((item:any) => renderItem({ item }))}</View>
        )}
      </Card>

      <Modal visible={modalVisible} animationType="slide" style={styles.modal} transparent>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={setModalVisible} style={styles.modalClose} testID="close">
        <X size={20} color={colors.BLACK}/>
          </TouchableOpacity>
          <Text maxFontSizeMultiplier={1.4} style={styles.modalHeader}>
            {'FILTER_TRANSACTION'}
          </Text>
          <View style={styles.flatList}>
            <FlatList
              data={transactionCategory}
              renderItem={({ item }) => (
                <FilterRenderItem dispatch={dispatch} item={item} selected={''} />
              )}
              refreshing={refresh}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export const OptionCard: FC<IOptionCardProps> = ({
  title,
  icon,
  route,
  cardStyle,
  imageStyle,
  textStyle,
  row = false,
}) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const handleCardPress = () => {
        navigation.navigate(route);
  };
  return (
    <Card testID="option-card" onPress={handleCardPress} cardStyle={cardStyle}>
       {icon && (
      <View style={{ flexDirection: row ? 'row' : 'column', alignItems: AlignItemType.Center }}>
         <Image
         source={icon ? { uri: icon } : icons.NO_IMAGE_FOUND}
         resizeMode="contain"
         style={imageStyle}
         />
        <Text maxFontSizeMultiplier={1.4} style={textStyle}>
          {title}
        </Text>
      </View>
        )}
    </Card>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.RED,
    fontWeight: FontWeight.W400,
    marginHorizontal: 6.1,
  },

  transactionHistoryCardContainer: {},
  cardStyle: {
    padding: 10,
    width: '45%',
    alignItems: AlignItemType.Center,
  },
  filterIcon: { position: 'absolute', top: -20 },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: colors.WHITE,
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingVertical: 8,
    backgroundColor: colors.TEXT_COLOR,
  },
  imageStyle: {
    backgroundColor: colors.TEXT_COLOR,
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: 14,
    top: 10,
    color: colors.BLACK,
    marginBottom: 10,
    fontWeight: FontWeight.W500,
  },
  modal: { margin: 0 },
  modalView: {
    // height: '35%',
    marginTop: 'auto',
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalClose: {
    alignSelf: AlignSelfType.FlexEnd,
    marginRight: 10,
    marginTop: 10,
  },
  modalHeader: {
    alignSelf: AlignSelfType.Center,
    fontSize: 16,
    fontWeight: FontWeight.Normal,
    color: colors.BLACK,
  },
  home: { width: 28, height: 28 },
  flatList: {
    marginTop: 10,
    marginBottom: 40,
    marginLeft: 15,
  },
  section: {
    width: '90%',
    marginVertical: 7,
    marginLeft: 7,
    backgroundColor: colors.HEADER,
    borderRadius: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: AlignItemType.Center,
    backgroundColor: colors.WHITE,
    margin: 0,
    width: '100%',
    height: 'auto',
  },
  itemText: { fontSize: 16, color: colors.GREY, marginLeft: 15 },
});
