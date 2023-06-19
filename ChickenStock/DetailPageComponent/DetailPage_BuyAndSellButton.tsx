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
  Another: {company_name: string; company_code: string}; // 전달 받는 데이터 타입 지정
  BuyPage: undefined;
  SellPage: undefined;
};

type AnotherPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BuyPage',
  'SellPage'
>;
//  수정필요
// AnotherPage에서 전달 받는 데이터의 속성 지정
type Component4Props = {
  company_name: string;
  company_code: string;
};

// Component4에게 Component4Props라는 속성을 주고 변수를 전달받아 사용함
const Component4: React.FC<Component4Props> = ({
  company_name,
  company_code,
}) => {
  console.log('com4');
  console.log(company_name);
  console.log(company_code);
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
