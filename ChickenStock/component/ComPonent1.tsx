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
    단축코드: '',
    기준가: '',
  });

  // const [price, setPrice] = useState(0);
  // 기준가: '';
  useEffect(() => {
    fetch('http://192.168.100.69:5000/companydetail')
      .then(response => response.json())
      .then(data => {
        setCompany(data);
      })
      .catch(error => console.error(error));
  }, []);

  // useEffect(() => {
  //   // 가정: 기준가를 가져오는 API URL이 http://192.168.100.69:5000/companydetail/price 라고 가정했습니다.
  //   fetch('http://192.168.100.69:5000/companydetailP')
  //     .then(response => response.json())
  //     .then(data => {
  //       // 가정: data 객체 안에 price 항목이 있다고 가정하였습니다.
  //       setPrice(data.stck_sdpr);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>기업 이름: {company['한글명']}</Text>
      <Text style={styles.text}>단축코드: {company['단축코드']}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.text}>기준가: {company['기준가']}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
