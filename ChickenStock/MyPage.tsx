import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TopMenuPage from './TopMenuPage';

const MyPage = () => {
  const [data, setData] = useState<any>({}); // data useState를 사용하여 상태 설정
  const [userCategory, setUserCategory] = useState<string>();
  console.log('유저 카테고리: ', userCategory)

  function name_change(name:string) {
    if(name === '건설') {
      return '건설업'
    } else if(name === '금융') {
      return '금융업'
    } else if(name === '기계') {
      return '기계'
    } else if(name === '서비스업') {
      return '서비스업'
    } else if(name === '섬유/의복') {
      return '섬유·의복'
    } else if(name === '음식료품') {
      return '음식료품'
    } else if(name === '의약품') {
      return '의약품'
    } else if(name === '전기/전자') {
      return '전기·전자'
    } else if(name === '철강/금속') {
      return '철강·금속'
    } else if(name === '통신업') {
      return '통신'
    } else if(name === '화학') {
      return '화학'
    } else {
      return '미분류'
    }
  }

  // 데이터 가져오는 함수
  // flask서버로 데이터 요청
  const fetchData = async () => {
    console.log('요청보냄')
    try {
      const response = await fetch('http://10.0.2.2:5000/account');
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        console.log('서버 연결 완료');
        console.log('응답 받은 data: ', jsonData);
        console.log('카테고리', jsonData['choiceTwo'])
        setUserCategory(name_change(jsonData['choiceTwo']))
      } else {
        throw new Error('서버 응답이 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect를 사용하여 페이지가 렌더링 될 때마다 fetchData()함수를 실행
  useEffect(() => {
    fetchData();
  }, []);

  console.log('data', data);
  console.log('type');
  console.log(typeof data);
  const interest = ['건설업', '금융업', '기계', '서비스업', '섬유·의복', '음식료품', '의약품', '전기·전자', '철강·금속', '통신', '화학', '미분류'];
  const enter = ['기업 명', '현재가', '등락', '보유 수량', '평가 금액'];
  const transaction = ['구매', '판매', '미채결'];
  const enterValue = [1, 2, 3, 4, 5];
  const transactionValue = [6, 7, 8, 9, 10];
  return (
    <View>
      <View>
        <TopMenuPage></TopMenuPage>
      </View>
      {Object.keys(data).length !== 0 && (
        <View style={styles.myMoneyCss}>
          <Text>
            은행 : {data.bank} 계좌 잔액 : {data.account}
          </Text>
          {/* <Text></Text> */}
        </View>
      )}
      <View style={styles.myInterestCss}>
        <Text>본인 관심사</Text>
      </View>
      <View style={styles.circleContainerCss}>
        {interest.map((item, index) => (
          <TouchableOpacity style={styles.circleButtonCss}>
            <Text key={index}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.enterCss}>
        {enter.map((item, index) => (
          <View style={styles.enterNameCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.enterValueCss}>
        {enterValue.map((item, index) => (
          <View style={styles.enterInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.enterValueCss}>
        {enterValue.map((item, index) => (
          <View style={styles.enterInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.enterValueCss}>
        {enterValue.map((item, index) => (
          <View style={styles.enterInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.enterValueCss}>
        {enterValue.map((item, index) => (
          <View style={styles.enterInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionContainerCss}>
        {transaction.map((item, index) => (
          <TouchableOpacity style={styles.transactionCss}>
            <Text key={index}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {transactionValue.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {transactionValue.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {transactionValue.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {transactionValue.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {transactionValue.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myMoneyCss: {
    width: '100%',
    height: 50,
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myInterestCss: {
    width: '100%',
    height: 30,
    marginTop: 20,
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainerCss: {
    width: '100%',
    heigt: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circleButtonCss: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexBasis: '16%',
    marginBottom: 5,
  },
  enterCss: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  enterNameCss: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterValueCss: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterInsertCss: {
    width: '20%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  transactionContainerCss: {
    display: 'flex',
    flexDirection: 'row',
  },
  transactionCss: {
    width: 50,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 30,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionValueCss: {
    width: '100%',
    height: 30,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInsertCss: {
    width: '20%',
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
});
export default MyPage;
