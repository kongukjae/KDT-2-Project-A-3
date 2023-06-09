import React, { useState } from 'react';
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

  const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const names = ['기업 명', '현재가', '등락', '보유 수량', '평가 금액']

  return (
    <View style={{ flex: 1, borderWidth: 1, backgroundColor: 'red' }}>
      <View>
        <TopMenuPage></TopMenuPage>
      </View>
      <View style={styles.my_money}>
        <Text>내 계좌</Text>
      </View>
      <View style={styles.my_interest}>
        <Text>본인 관심사</Text>
      </View>
      <View style={styles.container}>
        {items.map((item, index) => (
          <TouchableOpacity style={styles.button}>
            <Text key={index}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.name}>
        {names.map((item, index) => (
          <View style={styles.setname}>
          <Text key={index}>
            {item}
          </Text>
          </View>
        ))}
      </View>
      <View style={styles.valueContainer}>
        <View style={styles.value}>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
        <View style={styles.value}>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>  
        <View style={styles.value}>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
       
      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  my_money: {
    width: '100%',
    height: 50,
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  my_interest: {
    width: '100%',
    height: 30,
    marginTop: 20,
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width : '100%',
    heigt : 200,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  button: {
    flexDirection: "row",
    backgroundColor: 'lightgray',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexBasis: '25%',

  },
  name: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'green'
  },
  setname: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value:{
    width:'100%',
    height:50,
    backgroundColor:'yellow'
  }

})
export default MyPage;