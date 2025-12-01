import { useNavigation } from '@react-navigation/native';
import Background from '@src/components/background';
import { useBackButtonHandler } from '@src/hooks/useBackButtonHandler';
import { RootState } from '@src/redux/store';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import useFetchHomePageData from '@src/hooks/useFetchHomePageData';
import {  Menu } from 'lucide-react-native';
import colors from '@src/constants/colors';
import { NavigationProps } from '@src/@types/navigation';
import { useAPIService } from '@src/context/APIServiceContext';
import { OptionCard, TransactionHistoryCard } from '@src/components/common/homeComponents';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const apiService = useAPIService();
  useBackButtonHandler();
  const {  fetchUserData } = useFetchHomePageData();
  const {  userInfo } = useSelector(
    (state: RootState) => state.user
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

 
  useEffect(() => {
    setRefresh(!refresh);
    setModalVisible(false);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserData();
  }, []);

  return (
    <Background
      swipeAbleScreens
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={refreshing}
      header={{
        logo: true,
        leftIcon: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Menu size={25} color={colors.WHITE} />
          </TouchableOpacity>
        ),
      }}>
      <View style={styles.cardContainer}>
        <OptionCard
          cardStyle={styles.cardStyle}
          imageStyle={styles.image}
          textStyle={styles.text}
          title={'pay'}
          icon={null}
          route={''}
        />
        <OptionCard
          cardStyle={styles.cardStyle}
          imageStyle={styles.image}
          textStyle={styles.text}
          title={'request'}
          icon={null}
          route={''}
        />
      </View>
      
      <TransactionHistoryCard
        refresh={true}
        transactionCategory={[]}
        modalVisible={modalVisible}
        setModalVisible={() => setModalVisible(false)}
        onPressFilterButton={() => setModalVisible(true)}
      />
    </Background>
  );
};

export default Home;
