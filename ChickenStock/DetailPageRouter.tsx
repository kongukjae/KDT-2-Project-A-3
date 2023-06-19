import React, { useState } from 'react';
import {View, StyleSheet, ActivityIndicator, Image, Text} from 'react-native';
import ComPonent1 from './DetailPageComponent/DetailPage_NameAndChange';
import ComPonent2 from './DetailPageComponent/DetailPage_StockChart';
import ComPonent3 from './DetailPageComponent/DetailPage_StockDetailInfo';
import ComPonent4 from './DetailPageComponent/DetailPage_BuyAndSellButton';
import {useRoute} from '@react-navigation/native';

// useRoute hook을 적용한다. 이는 페이지가 전환될때 전달될 매개변수를 정의한다.
// API를 요청할때 쓰이는 공통 매개변수가 기업 이름과 종목코드로, 적절하다.
const AnotherPage = () => {
  const route = useRoute();
  const {company_name} = route.params as {company_name: string};
  const {company_code} = route.params as {company_code: string};


  // 각각의 컴포넌트에 지정한 매개변수를 전달한다.
  return (
    <View style={styles.container}>
      <ComPonent1 company_name={company_name} company_code={company_code} />
      <ComPonent2 company_name={company_name} company_code={company_code} />
      <ComPonent3 company_name={company_name} company_code={company_code} />
      <ComPonent4 company_name={company_name} company_code={company_code} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 3,
    backgroundColor: '#FFE194',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_window: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9C85',
  },
  LogoImage: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 40,
    fontWeight: '700',
  },
});
export default AnotherPage;
