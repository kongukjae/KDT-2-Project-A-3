import React from 'react';
import {View, StyleSheet} from 'react-native';
import ComPonent1 from './component/ComPonent1';
import ComPonent2 from './component/ComPonent2';
import ComPonent3 from './component/ComPonent3';
import ComPonent4 from './component/ComPonent4';

const AnotherPage = () => {
  return (
    <View style={styles.container}>
      <ComPonent1 />
      <ComPonent2 />
      <ComPonent3 />
      <ComPonent4 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    // backgroundColor: 'red',
  },
});

export default AnotherPage;
