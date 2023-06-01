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
import SignUpPage from './SignUpPage';
import LoginPage from './loginPage'

type RootStackParamList = {
  ChoicePageOne: undefined;
  ChoicePageTwo: undefined;
  ChoicePageThree: undefined;
  ChoicePageFour: undefined;
  MainPage: undefined;
  Another: undefined;
  SignUpPage: undefined;
  LoginPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
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
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;