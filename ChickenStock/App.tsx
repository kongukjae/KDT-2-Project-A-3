import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Alert } from 'react-native';

export default function SignUpPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [number, setNumber] = useState('');

  const handleSignUp = () => {
    // 여기에서 회원가입 로직을 추가할 수 있습니다.
    const validateId = () => {
      const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
      return (id.length >= 4) && (idRegex.test(id));
    }

    const validatePassword = () => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
      return (password.length >= 8)&&(passwordRegex.test(password));
    }

    if(!id || !password || !name || !bank || !number){
      Alert.alert('경고', '모든 정보를 입력해주세요.');
      return;
    }

    if(!validateId()){
      Alert.alert('경고', '아이디는 4자리 이상, 영문, 숫자를 포함하여 입력해주세요.');
      return;
    }

    if(!validatePassword()){
      Alert.alert('경고', '비밀번호 8자리 이상, 영문, 숫자, 특수문자를 포함하여 입력해주세요.');
      return;
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        onChangeText={text => setId(text)}
        value={id}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>가입하기</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});