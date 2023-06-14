import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import io from 'socket.io-client'; // socket.io-client import

const ComPonent1 = () => {
  const [company, setCompany] = useState({
    한글명: '',
    단축코드: '',
    기준가: '',
  });
  const [changeRate, setChangeRate] = useState({
    prdy_ctrt: '',
    stck_prpr: '',
  });

  useEffect(() => {
    fetch('http://10.0.2.2:5000/companydetail')
      .then(response => response.json())
      .then(data => {
        setCompany(data);

        console.log(data);
      })
      .catch(error => console.error(error));

    // 1.socket instance 생성, 서버와 연결되는 소켓 인스턴스를 생성한다.
    const socket = io('http://10.0.2.2:5000');

    socket.emit('request_company_rate');
    // socket 이벤트 리스너
    socket.on('changerate', data => {
      setChangeRate(data);
      console.log(data);
      console.log('뜸북장이여 어디여');
      socket.emit('request_company_rate');
    });

    return () => {
      socket.off('changerate');
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles1.container}>
      <Text style={styles1.text}>코스피</Text>
      <View style={styles1.priceContainer}>
        <Text style={styles2.text}>기업이름: {company['한글명']}</Text>
        <Text style={styles3.text}>단축코드: {company['단축코드']}</Text>
        <View style={styles1.priceContainer}>
          <Text
            style={[
              redblue.text,
              {
                color:
                  parseFloat(changeRate['prdy_ctrt'] as string) < 0
                    ? 'blue'
                    : 'red',
              },
            ]}>
            등락률: {changeRate['prdy_ctrt']}
          </Text>
          <Text style={styles1.text}>기준가: {changeRate['stck_prpr']}</Text>
        </View>
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 10,
    color: 'black',
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
// 기업이름, 한글명
const styles2 = StyleSheet.create({
  container: {},
  text: {
    fontSize: 15,
  },
});
// 단축코드, 단축코드
const styles3 = StyleSheet.create({
  text: {
    marginLeft: -50,
    fontSize: 12,
    marginTop: 20,
  },
});
const redblue = StyleSheet.create({
  text: {
    fontSize: 12,
    color: 'red',
    marginLeft: -20,
  },
});
export default ComPonent1;
