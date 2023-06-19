import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../AllContext';

type Component2Props = {
  company_name: string;
  company_code: string;
};

const ComPonent3: React.FC<Component2Props> = ({
  company_name,
  company_code,
}) => {
  console.log('com3');
  console.log(company_name, company_code);
  const [upAndDown, setCompany] = useState({
    시가: '',
    오늘최고가: '',
    오늘최저가: '',
    현재가: '',
    시가총액: '',
  });


  const { setCompanyName, setCompanyPrice } = useContext(AuthContext)

  setCompanyName(company_name);
  setCompanyPrice(parseInt(upAndDown.현재가))
  console.log(setCompanyName)
  console.log(setCompanyPrice)
  
  useEffect(() => {
    fetch(`http://10.0.2.2:5000/companyupdown/${company_name}`)
      .then(response => response.json())
      .then(data => {
        setCompany(data);

        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>시가: {upAndDown['시가']}원</Text>
      <Text style={styles.text}>오늘최고가: {upAndDown['오늘최고가']}원</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>오늘최저가: {upAndDown['오늘최저가']}원</Text>
        <Text style={styles.text}>현재가: {upAndDown['현재가']}원</Text>
        <Text style={styles.text}>시가총액: {upAndDown['시가총액']}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 30,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 20,
    padding: 5,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default ComPonent3;
