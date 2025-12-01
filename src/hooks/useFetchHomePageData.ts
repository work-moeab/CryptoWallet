import {
  validateImageUri,
} from '@src/helper/helper';
import {
  setDeviceUniqueId,
  setUserInfo,
} from '@src/redux/features/user/userSlice';
import { RootState } from '@src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { useAPIService } from '@src/context/APIServiceContext';



const useFetchHomePageData = () => {
  const dispatch = useDispatch();
  const apiService = useAPIService();
  const {  deviceUniqueId } = useSelector((state: RootState) => state.user);

  const fetchUserData = async () => {
    // try {
    //   const userRes = await apiService.auth.getUserData({
    //     UniqueId: deviceUniqueId,
    //   });
    //   if (userRes.success) {
    //     const image = validateImageUri(userRes.output.userProfilePicture);
    //     dispatch(
    //       setUserInfo({
    //         ...userRes.output,
    //         userProfilePicture: image ? userRes.output.userProfilePicture : null,
    //       })
    //     );
    //   }
    // } catch (error) {
    //   if (error) return;
    //   /* error */
    // }
  };


  const fetchDeviceUniqueId = async () => {
    try {
      const uniqueId = await DeviceInfo.getUniqueId();
      console.log('-------', uniqueId);
      dispatch(setDeviceUniqueId(uniqueId));
    } catch (error) {
      if (error) return;
    }
  };



  return {
    fetchUserData,
    fetchDeviceUniqueId,
  };
};

export default useFetchHomePageData;
