import React, { useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity,
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
    backgroundColor: '#1B9C85',
  },
  logoTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  logoText: {
    color: '#FFE194',
    fontSize: 50,
    fontFamily: 'BagelFatOne-Regular'
  },
  input: {
    height: 40,
    borderColor: '#E8F6EF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: '#FFE194',
  },
  LogoTag: {
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
  signupText: {
    fontSize: 15,
    color: '#E8F6EF',
    fontWeight: '500'
  },
  btnBox: {
    backgroundColor: '#E8F6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '100%',
    height: 80,
  },
  btnText: {
    height: '60%',
    color: '#1B9C85',
    fontSize: 30,
    fontFamily: 'BagelFatOne-Regular'
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
        console.log(username)
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
        <Image source={require('./image/logo.png')} style={styles.LogoImage} />
      </View>
      <View style={styles.logoTextContainer}>
        <Text style={styles.logoText}>Chicken Stock</Text>
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
      <TouchableOpacity style={styles.btnBox} onPress={postData}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signUp} >
      <Text style={styles.signupText} onPress={() => {
        navigation.navigate('SignUpPage')
        }}>Sign up</Text>
      </View>
    </View>
  );
};

export default LoginPage;
