import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

  useEffect(() => {
    fetch(`http://3.35.39.162:5010/companyupdown/${company_name}`)
      .then(response => response.json())
      .then(data => {
        setCompany(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  const formatNumber = (num: number): string =>
    num.toLocaleString('en-US') + '원';
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 38,
      backgroundColor: '#4C4C6D',
      borderRadius: 10,
    },
    text: {
      fontSize: 25,
      padding: 5,
    },
    coloredText: {
      fontSize: 25,
      padding: 5,
      color: 'white',
      justifyContent: 'center',
    },
    priceContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.coloredText}>
          시가: {formatNumber(Number(upAndDown['시가']))}
        </Text>
        <Text style={styles.coloredText}>
          오늘최고가: {formatNumber(Number(upAndDown['오늘최고가']))}
        </Text>
        <Text style={styles.coloredText}>
          오늘최저가: {formatNumber(Number(upAndDown['오늘최저가']))}
        </Text>
        <Text style={styles.coloredText}>
          현재가: {formatNumber(Number(upAndDown['현재가']))}
        </Text>
        <Text style={styles.coloredText}>
          시가총액: {upAndDown['시가총액']}
        </Text>
      </View>
    </View>
  );
};
export default ComPonent3;
