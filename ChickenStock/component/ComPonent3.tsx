import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ComPonent3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>기업 이름: 삼성</Text>
      <Text style={styles.text}>기업 코드: 005930</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>가격: 85000원</Text>
        <Text style={styles.text}>상승폭: +3000(+3.66%)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ComPonent3;
