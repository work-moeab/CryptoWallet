import React, { ReactNode } from 'react';
import { MerchantContractTypeEnum } from '../enum';
import { WebViewNavigation } from 'react-native-webview';
import { IMerchantTranactionListProps } from '../redux/slices/merchant';
import { ViewStyle } from 'react-native';
import { WhatTheDifferenceProps } from '../apiService/card/response';

//Modal

type ICustomModalProps = {
  children?: ReactNode;
  visible?: boolean;
  containerStyle?: ViewStyle;
  overlayStyle?: object;
  pressable?: boolean;
  onPress?: () => void;
};
type IInfoModal = {
  visible: boolean;
  setVisible: () => void;
  title?: string;
  message?: string;
  isSuccess?: boolean;
  buttonText?: string;
  backButton?: () => void;
  buttonContainerSyle?: object;
};

type INInternetModal = {
  visible: boolean;
  lowInternet: boolean;
};
type IAlertModal = {
  visible: boolean;
  cancel: () => void;
  cancelButtonText?: string;
  confirm: undefined | (() => void);
  confirmButtonText?: string;
  title?: string;
  message?: string;
  cancelButtonColor?: string;
  confirmButtonColor?: string;
};

interface IUserCardDetails {
  userName: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}


type IPaymentModal = {
  visible: boolean;
  title?: string;
  message?: string;
  isSuccess?: boolean;
  isError?: boolean;
  number?: string;
  button?: () => void;
  buttonText?: string;
  buttonColor?: string;
};

interface IChipEvents {
  content: string;
  created: string;
  eventID: string;
  mediaURL: string;
  messageType: string;
  routeURL: string;
  status: string;
  title: string;
  actions?: string;
}

//DeleteModalProps
interface IDeleteModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (string: Password) => void;
}

//ApproveRequestModalProps
interface IApproveRequestModalProps {
  isVisible: boolean;
  onClose: () => void;
  handleRequest: (approve: boolean) => void;
  request?: IMerchantTranactionListProps | TransactionItem;
}
//TransactionItemModalProps
interface ITransactionItemModalProps {
  isVisible: boolean;
  onClose: () => void;
  transaction: IMerchantTranactionListProps | TransactionItem;
}

interface MediaRendererProps {
  url: string;
}
