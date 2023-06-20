import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFE194',
  },
  titleBox: {
    height: 250,
    flexDirection: 'row',
    backgroundColor: '#FFE194',
    alignItems: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    left: 15,
    top: 150,
  },
  type: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#FFE194',
    gap: 30,
  },
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
//* 사용되는 해당 페이지의 타입 지정
type RootStackParamList = {
  ChoicePageOne: undefined;
  ChoicePageTwo: {choiceOne: string};
  ChoicePageThree: {choiceOne: string; choiceTwo: string};
  ChoicePageFour: {choiceOne: string; choiceTwo: string; choiceThree: string};
  MainPage: undefined;
  LoginPage: undefined;
};
type ChoicePageOneNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChoicePageTwo'
>;
type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

//* 리액트의 Fuction Component로 사용하여 ChoicePageOne으로 export
export const ChoicePageOne: React.FC = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  const handleChoice = (choiceOne: string) => {
    //* choiceOne의 데이터와 함께 navigate메서드를 이용해 ChoicePageTwo 이동
    navigation.navigate('ChoicePageTwo', {choiceOne});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 주식 스타일을 선호하시나요?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('안정적인 투자 스타일')}>
        <Text style={styles.text}>안정적인 투자 스타일</Text>
      </TouchableOpacity>
      {/* //* addEventListener와 비슷한 태그 눌렀을 때 함수를 실행시킬수 있도록 하는태그 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('수익 분배형 투자 스타일')}>
        <Text style={styles.text}>수익 분배형 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('수익 중심형 투자 스타일')}>
        <Text style={styles.text}>수익 중심형 투자 스타일</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('공격적인 투자 스타일')}>
        <Text style={styles.text}>공격적인 투자 스타일</Text>
      </TouchableOpacity>
    </View>
  );
};

type ChoicePageTwoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChoicePageTwo'
>;
type ChoicePageTwoRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

export const ChoicePageTwo: React.FC = () => {
  const navigation = useNavigation<ChoicePageTwoNavigationProp>();
  const route = useRoute<ChoicePageTwoRouteProp>();
  const {choiceOne} = route.params;

  const handleChoice = (choiceTwo: string) => {
    navigation.navigate('ChoicePageThree', {choiceOne, choiceTwo});
  };

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.titleBox}>어떤 주식 종목에 관심 있으신가요? </Text>
      </View>
      <View style={styles.type}>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('건설업')}>
            <Text style={styles.text}>건설업</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('금융업')}>
            <Text style={styles.text}>금융업</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('기계')}>
            <Text style={styles.text}>기계</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('화학')}>
            <Text style={styles.text}>화학</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('음식료품')}>
            <Text style={styles.text}>음·식료품</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('전기·전자')}>
            <Text style={styles.text}>전기/전자</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('섬유·의복')}>
            <Text style={styles.text}>섬유/의류</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('통신업')}>
            <Text style={styles.text}>통신업</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('의약품')}>
            <Text style={styles.text}>의약품</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('서비스업')}>
            <Text style={styles.text}>서비스업</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('철강·금속')}>
            <Text style={styles.text}>철강/금속</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleChoice('미분류')}>
            <Text style={styles.text}>기타</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

type ChoicePageThreeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChoicePageThree'
>;
type ChoicePageThreeRouteProp = RouteProp<
  RootStackParamList,
  'ChoicePageThree'
>;

export const ChoicePageThree: React.FC = () => {
  const navigation = useNavigation<ChoicePageThreeNavigationProp>();
  const route = useRoute<ChoicePageThreeRouteProp>();
  const {choiceOne, choiceTwo} = route.params;

  const handleChoice = (choiceThree: string) => {
    navigation.navigate('ChoicePageFour', {choiceOne, choiceTwo, choiceThree});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주식 투자를 해보신 적 있으신가요? </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('처음이에요')}>
        <Text style={styles.text}>처음이에요</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('해보긴 해봤어요')}>
        <Text style={styles.text}>해보긴 해봤어요</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleChoice('많이 해봤어요')}>
        <Text style={styles.text}>많이 해봤어요.</Text>
      </TouchableOpacity>
    </View>
  );
};

type ChoicePageFourNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChoicePageFour'
>;
type ChoicePageFourRouteProp = RouteProp<RootStackParamList, 'ChoicePageFour'>;

export const ChoicePageFour: React.FC = () => {
  const navigation = useNavigation<ChoicePageFourNavigationProp>();
  const route = useRoute<ChoicePageFourRouteProp>();
  const {choiceOne, choiceTwo, choiceThree} = route.params;
  const [choiceFour, setChoiceFour] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChoice = (choice: string) => {
    setChoiceFour(choice);
    setSelectedChoice(choice);
  };

  //* 저장버튼을 누르면 data에 One부터 Four를 담음
  const handleSubmit = () => {
    const data = {
      choiceOne,
      choiceTwo,
      choiceThree,
      choiceFour,
    };

    //* fetch를 통해서 db에 저장하기 위해 요청을 보냄
    fetch('http://172.26.14.81:5010/api/user-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('데이터 저장 성공');
          navigation.navigate('LoginPage'); // LoginPage로 이동
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
      <TouchableOpacity
        style={[
          styles.button,
          selectedChoice === '이해하지 못해요' && {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={() => handleChoice('이해하지 못해요')}>
        <Text style={styles.text}>이해하지 못해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedChoice === '일정 부분 이해해요' && {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        ]}
        onPress={() => handleChoice('일정 부분 이해해요')}>
        <Text style={styles.text}>일정 부분 이해해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedChoice === '깊이 있게 이해해요' && {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        ]}
        onPress={() => handleChoice('깊이 있게 이해해요')}>
        <Text style={styles.text}>깊이 있게 이해해요.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.text}>저장</Text>
      </TouchableOpacity>
    </View>
  );
};
