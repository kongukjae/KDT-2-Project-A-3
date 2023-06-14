import React from 'react';
import {View, StyleSheet} from 'react-native';
import ComPonent1 from './component/ComPonent1';
import ComPonent2 from './component/ComPonent2';
import ComPonent3 from './component/ComPonent3';
import ComPonent4 from './component/ComPonent4';
import { useRoute } from '@react-navigation/native';

const AnotherPage = () => {
  const route = useRoute();
  const { company_name } = route.params as { company_name: string };
  console.log(company_name)
  return (
    <View style={styles.container}>
      <ComPonent1 />
      <ComPonent2 />
      <ComPonent3 />
      <ComPonent4 company_name={company_name}/> {/* ComPonent4에 company_name을 전달 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: 'beige',
  },
});
export default AnotherPage;
