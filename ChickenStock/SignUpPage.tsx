import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//import { checkServerIdentity } from 'tls';/

export default function SignUpPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [number, setNumber] = useState('');

  const data = {
    id,
    password,
    name,
    bank,
    number,
  };

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
  let changeState = 0
  // 중복 확인
  const checkId = () => {
    fetch('http://192.168.100.140:5000/checkId', {
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
          changeState++
          Alert.alert('알림', '사용 가능한 ID입니다');
          // 회원가입 데이터 전송
        } else if (responseData.state === 'taken') {
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
    const validateId = () => {
      const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
      return (id.length >= 4) && (idRegex.test(id));
    }

    const validatePassword = () => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
      return (password.length >= 8) && (passwordRegex.test(password));
    }

    const validateNumber = () => {
      const numberRegex = /^\d{10}$/;
      return (number.length == 10) && (numberRegex.test(number))
    }

    if (!id || !password || !name || !bank || !number) {
      Alert.alert('경고', '모든 정보를 입력해주세요.');
      return;
    }

    if (!validateId()) {
      Alert.alert('경고', '아이디는 4자리 이상, 영문, 숫자를 포함하여 입력해주세요.');
      return;
    }

    if (!validatePassword()) {
      Alert.alert('경고', '비밀번호 8자리 이상, 영문, 숫자, 특수문자를 포함하여 입력해주세요.');
      return;
    }

    if (!validateNumber()) {
      Alert.alert('경고', '계좌번호는 숫자 10자리로 입력해주세요');
      return;
    }
    if ((changeState) % 2 === 1) {

      fetch('http://192.168.100.140:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok) {
            console.log('회원가입 데이터 전송 성공');
            console.log(JSON.stringify(data));
            navigation.navigate('ChoicePageOne'); // ChoicePageOne으로 이동
          } else {
            console.error('회원가입 데이터 전송 실패');
          }
        })
        .catch(error => {
          console.error('데이터 전송 실패', error);
        });
    } else {
      Alert.alert('경고', '아이디 중복확인 해주세요');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputid: {
    width: '55%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonid: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    marginLeft: 9,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



