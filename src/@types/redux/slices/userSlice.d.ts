
interface UserContact {
  firstName: string;
  lastName: string;
  image: string;
  phoneNumber: string;
}

interface IAllContacts {
  contacts: null | UserContact[];
  recentContacts: null | UserContact[];
}

interface IUserInfo {
  currency: string;
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userId?: string;
  userProfilePicture: string | null;
  walletAddress: string;
}


interface IBioStringProps {
  string: string;
  number: string;
}


interface UserState {
  token: string;
  deviceUniqueId: string;
  bioString: IBioStringProps;
  userInfo: IUserInfo;
  isInternetAvailable: boolean;
  userContacts: IAllContacts;
}
