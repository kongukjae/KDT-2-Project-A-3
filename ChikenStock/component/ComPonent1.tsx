import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ComPonent1 = () => {
  const [company, setCompany] = useState({
    한글명: '',
    단축코드: '',
    기준가: '',
  });

  useEffect(() => {
    fetch('http://192.168.100.69:5000/companydetail')
      .then(response => response.json())
      .then(data => {
        setCompany(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>기업이름: {company['한글명']}</Text>
      <Text style={styles.text}>단축코드: {company['단축코드']}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>기준가: {company['기준가']}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    fontSize: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ComPonent1;
