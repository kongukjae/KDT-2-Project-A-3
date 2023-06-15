import React from 'react';
import {View, StyleSheet} from 'react-native';
import ComPonent1 from './component/ComPonent1';
import ComPonent2 from './component/ComPonent2';
import ComPonent3 from './component/ComPonent3';
import ComPonent4 from './component/ComPonent4';
import {useRoute} from '@react-navigation/native';

const AnotherPage = () => {
  const route = useRoute();
  const { company_name } = route.params as { company_name: string };
  const { company_code } = route.params as { company_code: string }
  console.log(company_name)
  console.log(company_code)
  return (
    <View style={styles.container}>
      <ComPonent1 company_name={company_name} company_code={company_code}/>
      <ComPonent2 company_name={company_name} company_code={company_code}/>
      <ComPonent3 company_name={company_name} company_code={company_code}/>
      <ComPonent4 company_name={company_name} company_code={company_code}/>
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
