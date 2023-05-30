
// import React from 'react';
// import { View, TextInput, Button, StyleSheet,Image,Text, Alert } from 'react-native';
// import {NavigationContainer} from '@react-navigation/native' 
// import { createStackNavigator } from '@react-navigation/stack';
// import login from './login_module';

// const App = () => {

//   return (
    
//     login()

//   )
// };


// export default App;

import React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>홈 화면</Text>
      <Button
        title="상세 화면으로 이동"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  );
};

const DetailScreen = () => {
  return (
    <View>
      <Text>상세 화면</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;