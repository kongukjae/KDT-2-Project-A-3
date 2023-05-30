import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const ComPonent4 = () => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => console.log('구매하기 버튼 클릭!')}>
        <Text style={styles.buttonText}>구매하기</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => console.log('판매하기 버튼 클릭!')}>
        <Text style={styles.buttonText}>판매하기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
  },
  button: {
    width: 150, // 버튼의 너비
    height: 100, // 버튼의 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD', // 버튼의 배경 색
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // 버튼의 텍스트 색
  },
});

export default ComPonent4;
