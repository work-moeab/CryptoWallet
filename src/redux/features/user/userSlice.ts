import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '@src/constants/slices';

const initialState: UserState = {
  token: '',
  deviceUniqueId: '',
  bioString: {
    string: '',
    number: '',
  },
  userInfo: {
    currency: '',
    dob: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userId: '',
    walletAddress:'',
    userProfilePicture: null,
  },
  isInternetAvailable: true,
  userContacts: {
    contacts: null,
    recentContacts: null,
  },
  };

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<IUserInfo>) {
      state.userInfo = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setBioString(state, action: PayloadAction<IBioStringProps>) {
      state.bioString = action.payload;
    },
    setDeviceUniqueId(state, action: PayloadAction<string>) {
      state.deviceUniqueId = action.payload;
    },


    setIsInternetAvailable(state, action: PayloadAction<boolean>) {
      state.isInternetAvailable = action.payload;
    },
    setUserContacts(state, action: PayloadAction<IAllContacts>) {
      state.userContacts = action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const {
  resetUserState,
  setIsInternetAvailable,
  setDeviceUniqueId,
  setBioString,
  setUserInfo,
  setUserContacts,
} = userSlice.actions;
export default userSlice.reducer;
