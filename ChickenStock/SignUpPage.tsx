import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function SignUpPage() {
  const [id, setId] = useState(''); //아이디 상태 변수
  const [password, setPassword] = useState(''); //비밀번호 상태 변수
  const [name, setName] = useState(''); //이름 상태 변수
  const [bank, setBank] = useState(''); //은행 상태 변수
  const [number, setNumber] = useState(''); //계좌번호 상태 변수
  const [count, setCount] = useState(0); //중복확인 카운트 변수

  // data 변수 객체로 선언
  const data = {
    id,
    password,
    name,
    bank,
    number,
    account: 5000000
  };

  // 네비게이션 설정
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  type RootStackParamList = {
    ChoicePageOne: undefined;
    ChoicePageTwo: { choice: string };
    ChoicePageThree: { choice: string };
    ChoicePageFour: { choice: string };
    MainPage: undefined;
    Another: undefined;
    SignUpPage: undefined;
    LoginPage: undefined;
  };

  type ChoicePageOneNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ChoicePageTwo'
  >;
  type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;


  // id 중복 확인 로직
  const checkId = () => {
    
    fetch('http://10.0.2.2:5000/checkId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.id }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('아이디 전송 실패');
        }
      })
      .then(responseData => {
        if (responseData.state === 'available') {
          console.log('아이디 사용 가능');
          // id를 정규 표현시식을 사용하여 형식을 지정
          const validateId = () => {
            const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
            return id.length >= 4 && idRegex.test(id);
          };
          // 정규표현식에 어긋날 경우 뜨는 문구
          if (!validateId()) {
            Alert.alert(
              '경고',
              '아이디는 4자리 이상, 영문, 숫자를 포함하여 입력해주세요.',
            );
          } else {
            Alert.alert(
              '안내', '사용 가능한 ID입니다'
            )
          }
          // useState의 set 함수를 사용하여 count값 1증가하여 저장
          setCount(count + 1);
          
        } else if (responseData.state === 'unavailable') {
          console.log('아이디 이미 사용 중');
          Alert.alert('경고', '이미 사용중인 ID입니다.');
        }
      })
      .catch(error => {
        console.error('중복확인 실패', error);
      });
  };


  // 회원가입 데이터 전송
  const sendSignUpData = () => {
    // 비밀번호 정규표현식 설정
    const validatePassword = () => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
      return password.length >= 8 && passwordRegex.test(password);
    };
    // 계좌번호 정규표현식 설정
    const validateNumber = () => {
      const numberRegex = /^\d{10}$/;
      return number.length == 10 && numberRegex.test(number);
    };
    // 모든 정보를 필수로 입력하도록 설정
    if (!id || !password || !name || !bank || !number) {
      Alert.alert('경고', '모든 정보를 입력해주세요.');
      return;
    }
    // 비밀번호 정규표현식에 어긋났을 때 뜨는 문구
    if (!validatePassword()) {
      Alert.alert(
        '경고',
        '비밀번호 8자리 이상, 영문, 숫자, 특수문자를 포함하여 입력해주세요.',
      );
      return;
    }

    if (!validateNumber()) {
      Alert.alert('경고', '계좌번호는 숫자 10자리로 입력해주세요');
      return;
    }

    if ((count % 2) === 1) {
      // 서버로 데이터 요청
      fetch('http://10.0.2.2:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => { //요청에 대한 응답
          if (response.ok) {
            console.log('회원가입 데이터 전송 성공');
            console.log(JSON.stringify(data));
            navigation.navigate('ChoicePageOne'); // ChoicePageOne으로 이동
            setCount(0);
          } else {
            console.error('회원가입 데이터 전송 실패');
          }
        })
        .catch(error => {
          console.error('데이터 전송 실패', error);
        });
    } else if ((count % 2) === 0) {
      Alert.alert(
        '경고',
        '아아디 중복 확인 해주세요',
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>가입하기</Text>
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.inputid}
          placeholder="아이디를 입력하세요"
          onChangeText={text => setId(text)}
          value={id}
        />
        <TouchableOpacity style={styles.buttonid} onPress={checkId}>
          <Text style={styles.buttonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="이름을 입력하세요"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="은행을 입력하세요"
        onChangeText={text => setBank(text)}
        value={bank}
      />
      <TextInput
        style={styles.input}
        placeholder="계좌번호를 입력하세요"
        onChangeText={text => setNumber(text)}
        value={number}
      />
      <TouchableOpacity style={styles.button} onPress={sendSignUpData}>
        <Text style={styles.buttonText}>가입 하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1B9C85',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBox: {
    marginBottom: 50,
  },
  title: {
    fontSize: 50,
    marginBottom: 16,
    fontFamily: 'BagelFatOne-Regular',
    color: '#FFE194',
  },
  input: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFE194',
  },
  inputid: {
    width: '55%',
    height: 40,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FFE194',
  },
  button: {
    width: '80%',
    backgroundColor: '#E8F6EF',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonid: {
    backgroundColor: '#E8F6EF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    marginLeft: 9,
    borderRadius: 4,
  },
  buttonText: {
    height: 25,
    color: '#1B9C85',
    fontSize: 16,
    fontWeight: '900',
  },
});
