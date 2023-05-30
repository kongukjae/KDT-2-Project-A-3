import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const ComPonent4 = () => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title="구매하기"
        onPress={() => console.log('구매하기 버튼 클릭!')}
      />
      <Button
        title="판매하기"
        onPress={() => console.log('판매하기 버튼 클릭!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 50,
  },
});

export default ComPonent4;
