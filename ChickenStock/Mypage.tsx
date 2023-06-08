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
  return (
    <><View>
      <TopMenuPage></TopMenuPage>
    </View>
      <View style={styles.my_money}>
        <Text>내 계좌</Text>
      </View>
      <View style={styles.my_interest}>
        <Text>본인 관심사</Text>
      </View>
      </>

  );
};

const styles = StyleSheet.create({
  my_money: {
    width: '100%',
    height: 100,
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  my_interest: {
    width: '100%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
 
})
export default MyPage;