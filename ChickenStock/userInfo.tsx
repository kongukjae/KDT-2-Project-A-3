import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
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
  ChoicePageTwo: {choice: string};
  ChoicePageThree: {choice: string};
  ChoicePageFour: {choice: string};
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

  const handleChoice = (choice: string) => {
    navigation.navigate('ChoicePageTwo', {choice: choice});
    console.log(`${choice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 주식 스타일을 선호하시나요?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 1')}>
        <Text style={styles.text}>안정적인 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 2')}>
        <Text style={styles.text}>수익 분배형 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 3')}>
        <Text style={styles.text}>수익 중심형 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 4')}>
        <Text style={styles.text}>공격적인 투자 스타일</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ChoicePageTwo: React.FC = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  const handleChoice = (choice: string) => {
    navigation.navigate('ChoicePageThree', {choice: choice});
    console.log(`${choice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 주식 종목에 관심 있으신가요? </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 1')}>
        <Text style={styles.text}>제조</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 2')}>
        <Text style={styles.text}>건설</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 3')}>
        <Text style={styles.text}>엔터테인먼트</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 4')}>
        <Text style={styles.text}>금융</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 5')}>
        <Text style={styles.text}>IT / 반도체</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ChoicePageThree: React.FC = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  const handleChoice = (choice: string) => {
    navigation.navigate('ChoicePageFour', {choice: choice});
    console.log(`${choice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주식 투자를 해보신 적 있으신가요? </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 1')}>
        <Text style={styles.text}>처음입니다</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 2')}>
        <Text style={styles.text}>해보긴 해봤어요</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 3')}>
        <Text style={styles.text}>많이 해봤습니다.</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ChoicePageFour: React.FC = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  const handleChoice = (choice: string) => {
    navigation.navigate('MainPage');
    console.log(`${choice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>주식의 구조, 위험에 대해 알고 계신가요? </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 1')}>
        <Text style={styles.text}>이해하지 못해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 2')}>
        <Text style={styles.text}>일정 부분 이해합니다.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('Choice 3')}>
        <Text style={styles.text}>깊이 있게 이해합니다.</Text>
      </TouchableOpacity>
    </View>
  );
};
