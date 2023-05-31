// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const ComPonent1 = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>기업 이름: Samsung</Text>
//       <Text style={styles.text}>기업 코드: 005930</Text>
//       <View style={styles.priceContainer}>
//         <Text style={styles.text}>가격: 85000원</Text>
//         <Text style={styles.text}>상승폭: +3000(+3.66%)</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 3,
//   },
//   text: {
//     fontSize: 15,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default ComPonent1;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ComPonent1 = () => {
  const [company, setCompany] = useState({
    한글명: '',
    그룹코드: '',
    제조업: '',
    기준가: 0,
  });

  useEffect(() => {
    fetch('http://192.168.100.69:5000/companydetail')
      .then(response => response.json())
      .then(data => {
        setCompany(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>기업 이름: {company['한글명']}</Text>
      <Text style={styles.text}>그룹코드: {company['그룹코드']}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>제조업: {company['제조업']}</Text>
        <Text style={styles.text}>기준가: {company['기준가']}원</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
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
