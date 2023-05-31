
import React from 'react';
import { View, TextInput, Button, StyleSheet,Image,Text, Alert } from 'react-native';

const login = () => {
  const [userId, setUserId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const postData = async()=> {
    try {
      const response = await fetch('http://192.168.100.135:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id:userId,pw:password }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  }
  const handleLogin = () => {

    const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    // 로그인 처리 로직을 작성합니다.
    if(userId===''){
      Alert.alert("아이디를 입력해주세요.")
    }
    else{
      if(password===''){
        Alert.alert("비밀번호를 입력해주세요.")
      }
      else if(!passwordRegex.test(password)){
        Alert.alert('암호는 최소 8자 이상으로 입력해야하며 최소 하나의 대문자와 하나의 숫자를 포함하여 입력해주세요')
      }
      else{
        Alert.alert("유효성 검사 성공")
      }
      // ... 추가적인 로그인 처리 로직
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.LogoTag}>
        <Image 
          source={require('./image/logo.jpg')}
          style={styles.LogoImage}
          />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // 패스워드타입
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.signUp}>
      <Text>Sign up</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16, //수평 비율 조절 하는 거 인듯?
    backgroundColor:'#FFE194'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor:'white'
  },
  LogoTag:{
    flex: 0.5,
    justifyContent: 'center',
    alignItems:'center'    
  },
  LogoImage:{
    width:200,
    height:200
  },
  signUp:{
    alignItems:'flex-end',
    marginTop: 10
  }
});

export default login;