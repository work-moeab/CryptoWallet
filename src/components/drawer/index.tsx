import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import colors from '@src/constants/colors'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from './styles'
import { RootState } from '@src/redux/store'

import { showToast } from '@src/helper/helper'
import { LogOutIcon } from 'lucide-react-native'
import useFetchHomePageData from '@src/hooks/useFetchHomePageData'
import { NavigationProps } from '@src/@types/navigation'
import { useNavigation } from '@react-navigation/native'
import { useAPIService } from '@src/context/APIServiceContext'
import icons from '@src/assets/icons'

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<NavigationProps>()
  const dispatch = useDispatch()
  const apiService = useAPIService()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { userInfo, generalAppData } = useSelector((state: RootState) => state.user)
  const {  fetchUserData } = useFetchHomePageData()

  const onRefresh = async () => {
    setRefreshing(true)
    // await fetchUserData()
    setRefreshing(false)
  }
  const handleLogout = async () => {
  
  }

  return (
    <DrawerContentScrollView
      refreshControl={
        <RefreshControl
          // refresh control used for the Pull to Refresh
          testID="refreshControl"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate(PROFILE)
        }}>
        <View style={styles.profileContainer}>
          <View style={styles.imgBorder}>
            <View style={styles.imgInnerBorder}>
              <Image
                source={
                  userInfo.userProfilePicture
                    ? { uri: userInfo.userProfilePicture }
                    : icons.DUMMY_PICTURE
                }
                style={styles.img}
              />
            </View>
          </View>
          {userInfo.email && userInfo.lastName && userInfo.firstName ? (
            <View style={{ marginBottom: 10 }}>
              <Text maxFontSizeMultiplier={1.4} style={styles.userName}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </View>
          ) : (
            <View>
              <ActivityIndicator size="large" color={colors.BLACK} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <DrawerItemList
          {...props}
          // descriptors={Object.fromEntries(
          //   Object.entries(props.descriptors).map(([key, descriptor]) => [
          //     key,
          //     {
          //       ...descriptor,
          //       options: {
          //         ...descriptor.options,
          //         drawerAllowFontScaling: false,
          //       },
          //     },
          //   ]),
          // )}
        />
        <DrawerItem
          label="LOGOUT"
          testID="logout"
          onPress={handleLogout}
          allowFontScaling={false}
          icon={() => <LogOutIcon size={25} color={colors.BLACK} />}
          labelStyle={styles.label}
        />
      </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer
