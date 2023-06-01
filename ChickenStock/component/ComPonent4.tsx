import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ChoicePageOne: {choice: string};
  ChoicePageTwo: {choice: string};
  ChoicePageThree: {choice: string};
  ChoicePageFour: {choice: string};
  MainPage: undefined;
  Another: undefined;
};

type AnotherPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Another'
>;

const Component4 = () => {
  const navigation = useNavigation<AnotherPageNavigationProp>();

  const handleLocationMain = () => {
    navigation.navigate('MainPage');
  };

  const handleLocationChoiceOne = () => {
    navigation.navigate('ChoicePageOne', {choice: 'exampleChoice'}); // replace 'exampleChoice' with your choice string
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={handleLocationMain}>
        <Text style={styles.buttonText}>구매하기</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLocationChoiceOne}>
        <Text style={styles.buttonText}>판매하기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: 170, // 버튼의 너비
    height: 150, // 버튼의 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9C85', // 버튼의 배경 색
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // 버튼의 텍스트 색
  },
});

export default Component4;
