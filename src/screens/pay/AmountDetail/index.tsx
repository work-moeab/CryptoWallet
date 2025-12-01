import { useNavigation, useRoute } from '@react-navigation/native';
import { AlignSelfType, KeyboardTypeEnum, Modals } from '@src/@types/enum';
import Card from '@src/components/Card';
import Background from '@src/components/background';
import CustomButton from '@src/components/button';
import CustomTextInput from '@src/components/textInput';
import colors from '@src/constants/colors';
import { amountValidationSchema } from '@src/constants/validations';
import {
  formatNumberAsString,
  getValidationErrors,
} from '@src/helper/helper';
import { useAppSelector } from '@src/redux/hooks';
import { RootState } from '@src/redux/store';
import { Formik } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import styles from './styles';
import CurrencyTextInput from '@src/components/currencyTextInput';
import useFetchHomePageData from '@src/hooks/useFetchHomePageData';
import { NavigationProps } from '@src/@types/navigation';
import { useAPIService } from '@src/context/APIServiceContext';
import { PersonDetail } from '@src/components/common/amountDetailComponents';

const AmountDetail = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const apiService = useAPIService();
  const {  } = useFetchHomePageData();
  const {  userInfo } = useAppSelector(
    (state: RootState) => state.user
  );
  const route = useRoute();
  const {
    firstName,
    lastName,
    salesTax,
    description,
    profileImageUrl,
    qrType,
    amount,
    isQr,
    phoneNumber,
  } = route.params as {
    firstName: string;
    lastName: string;
    salesTax: number;
    description: string;
    profileImageUrl: string;
    qrType: string;
    amount: string;
    isQr: boolean;
    phoneNumber: string;
  };
  const desc = description || '';
  const isQR = isQr || false;

  const handlePaymentCall = async (amount: number, description: string) => {

  };

  const onSubmit = async (values: { amount: string; description: string }) => {
            handlePaymentCall(Number(values.amount.replace(/,/g, '')), values.description);
  };

  return (
    <Background
      avoidKeyboard
      header={{
        title: 'PAY',
      }}>
      <View style={styles.container}>
        <View style={styles.availableBalancecardContainer}>
        </View>
        <PersonDetail
          image={profileImageUrl}
          phone={phoneNumber}
          title={`${firstName || ''} ${lastName || ''}`}
        />
        <Formik
          enableReinitialize={true}
          initialValues={{
            amount:
              isQR && Number(amount) !== 0
                ? formatNumberAsString(Number(amount))
                : '0',
            description: desc,
          }}
          validateOnMount={amountValidationSchema.__isYupSchema__}
          validationSchema={amountValidationSchema}
          onSubmit={onSubmit}>
          {({ handleChange, handleSubmit, values, errors, isValid, dirty }) => (
            <View style={styles.cardView}>
              <Card cardStyle={styles.cardStyle}>
                <View
                  style={{
                    gap: 12,
                  }}>
                  {qrType === 'Merchant Sale' && (
                    <Text
                      maxFontSizeMultiplier={1.4}
                      style={{ fontSize: 16, color: colors.BLACK }}>
                      Amount
                    </Text>
                  )}
                  <CurrencyTextInput
                    onPress={() =>{}
                      // navigation.navigate(ENTER_AMOUNT, {
                      //   participant: undefined,
                      //   request: false,
                      //   limit: accountBalance.balance,
                      //   limitFrom: validations.AMOUNT_MAX,
                      //   minimumAmount: 0,
                      // })
                    }
                    value={
                      isQR && Number(amount) !== 0 && desc !== ''
                        ? formatNumberAsString(Number(amount))
                        : '0'
                    }
                    disabled={isQR && Number(amount) !== 0}
                  />
                </View>
                <CustomTextInput
                  inputTitle={qrType === 'Merchant Sale' ? 'Note' : ''}
                  value={isQR && amount !== '0.00' && desc !== '' ? desc : undefined}
                  placeholder={'DESCRIPTION'}
                  onBlur={() =>{}}
                  onChangeText={handleChange('description')}
                  maxLength={100}
                  keyboardType={KeyboardTypeEnum.Default}
                  // textAlign="right"
                  editable={!(isQR && amount !== '0.00' && desc !== '')}
                />
                <Text maxFontSizeMultiplier={1.4} style={styles.error}>
                  {getValidationErrors(errors, values, dirty)}
                </Text>

                <CustomButton
                  title={'PAY'}
                  testID="paybtn"
                  onPress={() => handleSubmit()}
                  activeOpacity={0.7}
                  buttonStyle={{
                    // ...buttonStyle.FILLED_ROUND(
                    //   300,
                    //   undefined,
                    //   isValid ? undefined : colors.BUTTON_DISABLED
                    // ),
                    alignSelf: AlignSelfType.Center,
                  }}
                  textStyle={{ ...styles.buttonTextStyle, color: colors.WHITE }}
                  disabled={!isValid}
                />
              </Card>
            </View>
          )}
        </Formik>
      </View>
    </Background>
  );
};

export default AmountDetail;
