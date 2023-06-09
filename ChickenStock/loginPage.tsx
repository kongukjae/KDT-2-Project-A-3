import React, { useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from './AllContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16, //수평 비율 조절 하는 거 인듯?
    backgroundColor: '#FFE194',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  LogoTag: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoImage: {
    width: 200,
    height: 200,
  },
  signUp: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});

const LoginPage = () => {
 const {setUserId}=useContext(AuthContext)
  // const inputIdToContext=()=>{
  //   return(
  //     <LoginContext.Provider value ="zz">
  //     </LoginContext.Provider>
  //   )
  // }

  type RootStackParamList = {
    Login: undefined;
    SignUpPage: undefined;
    MainPage: undefined;
  };
  type loginPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login'
  >;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const postData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: username, pw: password}), // 플라스크로 데이터를 담아 요청을 보냄
      });

      const jsonData = await response.json(); //여기서 플라스크로부터 반환값을 가져옴. 반환객체 ={'state':true or false,'message':"해당 에러 메세지"}
      if (jsonData['state'] === false) {
        Alert.alert(jsonData['message'], '', [{text: '확인'}]); //alert 첫번째 인자는 제목, 두번째 인자는 내용, 세번째 인자는 옵션을 넣을 수 있음 ex)예 아니오, 이벤트 등등
      } else {
        navigation.navigate('MainPage');
        setUserId(username)

      }
      // console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

 


  const navigation = useNavigation<loginPageNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.LogoTag}>
        <Image source={require('./image/logo.jpg')} style={styles.LogoImage} />
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
      <Button onPress={postData}title="Login" />
      <View style={styles.signUp} >
      <Text onPress={() => {
        navigation.navigate('SignUpPage')
        }}>Sign up</Text>
      </View>
    </View>
  );
};

export default LoginPage;
