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
import mongoose from 'mongoose';
import { MongoClient, WithId } from 'mongodb';
import axios from 'axios';

const MyPage = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/account');
        if(response.ok){
          const data = await response.json();
          console.log('서버 연결 완료')
          console.log(data); // 예시: 응답 데이터를 콘솔에 출력
        }else {
        throw new Error('서버 응답이 실패하였습니다.');
      }
        // 서버 응답 처리
      } catch (error) {
        // 에러 처리
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const interest = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const enter = ['기업 명', '현재가', '등락', '보유 수량', '평가 금액']
  const transaction = ['구매', '판매', '미채결']
  const enterValue = [1, 2, 3, 4, 5]
  const transactionValue = [6, 7, 8, 9, 10]
  return (
    <View>
      <View>
        <TopMenuPage></TopMenuPage>
      </View>
      <View style={styles.myMoneyCss}>

      </View>
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
            <Text key={index}>
              {item}
            </Text>
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
            <Text key={index} >{item}</Text>
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
    justifyContent: 'center'
  },
  myInterestCss: {
    width: '100%',
    height: 30,
    marginTop: 20,
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleContainerCss: {
    width: '100%',
    heigt: 200,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonCss: {
    flexDirection: "row",
    backgroundColor: 'lightgray',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexBasis: '25%',

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
    borderWidth: 1
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
    borderWidth: 1
  }

})
export default MyPage;