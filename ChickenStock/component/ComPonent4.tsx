import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ChoicePageOne: {choice: string};
  ChoicePageTwo: {choice: string};
  ChoicePageThree: {choice: string};
  ChoicePageFour: {choice: string};
  MainPage: undefined;
  Another: {company_name: string};
  BuyPage: undefined;
  SellPage: undefined;
};

type AnotherPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BuyPage',
  'SellPage'
>;

// AnotherPage에서 전달 받는 데이터의 타입 지정
type Component4Props = {
  company_name: string;
};

// Component4의 타입을 지정해주고 전달 받은 인자를 수신
const Component4: React.FC<Component4Props> = ({ company_name }) => {
  console.log('컴포넌트4')
  console.log(company_name)
  const navigation = useNavigation<AnotherPageNavigationProp>();

  const handleLocationMain = () => {
    navigation.navigate('BuyPage');
  };

  const handleLocationChoiceOne = () => {
    navigation.navigate('SellPage');
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={handleLocationMain}>
        <Text style={styles.buttonText}>구매하기</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLocationChoiceOne}>
        <Text style={styles.buttonText}>판매하기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: 170, // 버튼의 너비
    height: 100, // 버튼의 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9C85', // 버튼의 배경 색
    padding: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // 버튼의 텍스트 색
  },
});

export default Component4;
