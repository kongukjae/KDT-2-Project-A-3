/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 import React, {useEffect, useState} from 'react';
 import {View, Text} from 'react-native';
 import {
   ChoicePageOne,
   ChoicePageTwo,
   ChoicePageThree,
   ChoicePageFour,
 } from './userInfo';
 import MainPage from './MainPage';
 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 import AnotherPage from './AnotherPage';
 
 type RootStackParamList = {
   ChoicePageOne: undefined;
   ChoicePageTwo: undefined;
   ChoicePageThree: undefined;
   ChoicePageFour: undefined;
   MainPage: undefined;
   Another: undefined;
 };
 
 const Stack = createStackNavigator<RootStackParamList>();
 
 const App: React.FC = () => {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="ChoicePageOne">
         <Stack.Screen
           name="ChoicePageOne"
           component={ChoicePageOne}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name="ChoicePageTwo"
           component={ChoicePageTwo}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name="ChoicePageThree"
           component={ChoicePageThree}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name="ChoicePageFour"
           component={ChoicePageFour}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name="MainPage"
           component={MainPage}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name="Another"
           component={AnotherPage}
           options={{headerShown: false}}
         />
       </Stack.Navigator>
     </NavigationContainer>
   );
 };
 
 export default App;
 
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';

// const App = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://192.168.100.135:5000/api/data');
//       const jsonData = await response.json();
//       setData(jsonData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const postData = async () => {
//     try {
//       const response = await fetch('http://192.168.100.135:5000/api/data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: 'Hello from React Native!' }),
//       });
//       const jsonData = await response.json();
//       console.log(jsonData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Data: {data ? JSON.stringify(data) : 'Loading...'}</Text>
//       <Button title="Fetch Data" onPress={fetchData} />
//       <Button title="Post Data" onPress={postData} />
//     </View>
//   );
// };

// export default App;