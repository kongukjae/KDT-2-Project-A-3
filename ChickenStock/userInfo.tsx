import React, { useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFE194',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 50,
    left: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E8F6EF',
  },
  button: {
    backgroundColor: '#1B9C85',
    padding: 10,
    marginBottom: 20,
    left: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
type RootStackParamList = {
  ChoicePageOne: undefined;
  ChoicePageTwo: { choiceOne: string };
  ChoicePageThree: { choiceOne: string; choiceTwo: string };
  ChoicePageFour: { choiceOne: string; choiceTwo: string; choiceThree: string;};
  MainPage: undefined;
  Another: undefined;
};
type ChoicePageOneNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChoicePageTwo'
>;
type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

export const ChoicePageOne: React.FC = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  const handleChoice = (choiceOne: string) => {
    navigation.navigate('ChoicePageTwo', {choiceOne});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 주식 스타일을 선호하시나요?</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('안정적인 투자 스타일')}>
        <Text style={styles.text}>안정적인 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('수익 분배형 투자 스타일')}>
        <Text style={styles.text}>수익 분배형 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('수익 중심형 투자 스타일')}>
        <Text style={styles.text}>수익 중심형 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('공격적인 투자 스타일')}>
        <Text style={styles.text}>공격적인 투자 스타일</Text>
      </TouchableOpacity>
    </View>
  );
};

type ChoicePageTwoNavigationProp = StackNavigationProp<RootStackParamList,'ChoicePageTwo'>;
type ChoicePageTwoRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;


export const ChoicePageTwo: React.FC = () => {
  const navigation = useNavigation<ChoicePageTwoNavigationProp>();
  const route = useRoute<ChoicePageTwoRouteProp>();
  const { choiceOne } = route.params;

  const handleChoice = (choiceTwo: string) => {
    navigation.navigate('ChoicePageThree', { choiceOne, choiceTwo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 주식 종목에 관심 있으신가요? </Text>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('제조')}>
        <Text style={styles.text}>제조</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('건설')}>
        <Text style={styles.text}>건설</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('엔터테인먼트')}>
        <Text style={styles.text}>엔터테인먼트</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('금융')}>
        <Text style={styles.text}>금융</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('IT')}>
        <Text style={styles.text}>IT / 반도체</Text>
      </TouchableOpacity>
    </View>
  );
};

type ChoicePageThreeNavigationProp = StackNavigationProp<RootStackParamList,'ChoicePageThree'>;
type ChoicePageThreeRouteProp = RouteProp<RootStackParamList, 'ChoicePageThree'>;

export const ChoicePageThree: React.FC = () => {
  const navigation = useNavigation<ChoicePageThreeNavigationProp>();
  const route = useRoute<ChoicePageThreeRouteProp>();
  const { choiceOne, choiceTwo } = route.params;

  const handleChoice = (choiceThree: string) => {
    navigation.navigate('ChoicePageFour', { choiceOne, choiceTwo, choiceThree });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주식 투자를 해보신 적 있으신가요? </Text>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('처음이에요')}>
        <Text style={styles.text}>처음이에요</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('해보긴 해봤어요')}>
        <Text style={styles.text}>해보긴 해봤어요</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('많이 해봤어요')}>
        <Text style={styles.text}>많이 해봤어요.</Text>
      </TouchableOpacity>
    </View>
  );
};

type ChoicePageFourNavigationProp = StackNavigationProp<RootStackParamList,'ChoicePageFour'>;
type ChoicePageFourRouteProp = RouteProp<RootStackParamList, 'ChoicePageFour'>;

export const ChoicePageFour: React.FC = () => {
  const navigation = useNavigation<ChoicePageFourNavigationProp>();
  const route = useRoute<ChoicePageFourRouteProp>();
  const { choiceOne, choiceTwo, choiceThree } = route.params;
  const [choiceFour, setChoiceFour] = useState('');

  const handleChoice = (choice: string) => {
    setChoiceFour(choice);
  };

  const handleSubmit = () => {
    const data = {
      choiceOne,
      choiceTwo,
      choiceThree,
      choiceFour,
    };

    fetch('http://192.168.100.65:5000/api/user-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        console.log('데이터 저장 성공');
        navigation.navigate('MainPage'); // MainPage로 이동
      } else {
        console.error('데이터 저장 실패');
      }
    })
    .catch(error => {
      console.error('데이터 저장 실패', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주식의 구조, 위험에 대해 알고 계신가요? </Text>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('이해하지 못해요')}>
        <Text style={styles.text}>이해하지 못해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('일정 부분 이해해요')}>
        <Text style={styles.text}>일정 부분 이해해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleChoice('깊이 있게 이해해요')}>
        <Text style={styles.text}>깊이 있게 이해해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};