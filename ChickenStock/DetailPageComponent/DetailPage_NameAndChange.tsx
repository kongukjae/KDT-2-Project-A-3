import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import io from 'socket.io-client'; // socket.io-client import

// 1.받는 매개변수의 타입을 설정 문자열
type Component1Props = {
  company_name: string;
  company_code: string;
};
// 2. 컴포넌트1 함수를 정의, 기업이름, 기업코드를 매개변수로 받음
const ComPonent1: React.FC<Component1Props> = ({
  company_name,
  company_code,
}) => {
  console.log('com1');
  console.log(company_name, company_code); //305020
  // 3. 상태관리를 위해서 useState hook을 사용, 초기 빈 문자열로 상태를 배정
  const [changeRate, setChangeRate] = useState({
    prdy_ctrt: '',
    stck_prpr: '',
    cntg_vol: '',
  });

  useEffect(() => {
    // 4. useEffect Hook을 사용해서 컴포넌트가 렌더링 될때, company_code가 변경될때마다 다르게 렌더링
    // 1.socket instance 생성, 서버와 연결되는 소켓 인스턴스를 생성한다.
    const socket = io('http://172.26.14.81:5010');

    socket.emit('request_company_rate', {company_code});
    // socket 이벤트 리스너
    socket.on('changerate', data => {
      setChangeRate(data);
      console.log(data);
      console.log('뜸북장이여 어디여');
      // socket.emit('request_company_rate', {company_code});
    });

    const intervalId = setInterval(() => {
      socket.emit('request_company_rate', {company_code});
    }, 6000); // 2초마다 실행

    return () => {
      console.log('소켓이 꺼졌습니다.');
      clearInterval(intervalId); // 컴포넌트 unmount시 interval 제거
      socket.off('changerate');
      socket.disconnect();
    };
  }, [company_code]);

  return (
    <View style={styles1.container}>
      <View style={styles1.firstText}>
        <View style={styles1.left}>
          <Text style={styles1.text}>코스피</Text>
          <Text style={styles2.text}>기업이름: {company_name}</Text>
          <Text style={styles3.text}>단축코드: {company_code}</Text>
        </View>

        <View style={styles1.right}>
          <Text
            style={[
              redblue.text,
              {
                color:
                  parseFloat(changeRate['prdy_ctrt'] as string) < 0
                    ? 'blue'
                    : 'red',
                fontSize: 16,
                fontWeight: '900',
                paddingRight: '1%',
              },
            ]}>
            등락률: {changeRate['prdy_ctrt']}
          </Text>
          <Text style={styles1.text1}>거래량: {changeRate['cntg_vol']}</Text>
          <Text style={styles1.text1}>현재가: {changeRate['stck_prpr']}</Text>
        </View>
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    height: 85,
    backgroundColor: '#1B9C85',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
  },
  firstText: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#E8F6EF',
    fontWeight: '900',
  },
  text1: {
    fontSize: 15,
    color: '#E8F6EF',
    fontWeight: '900',
    paddingRight: '1%'
  },
  // 등락률과 현재가
  left: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
});
// 기업이름, 한글명
const styles2 = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    color: 'black',
  },
});
// 단축코드, 단축코드
const styles3 = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: '900',
  },
});
const redblue = StyleSheet.create({
  text: {
    fontSize: 12,
    color: 'red',
    paddingRight: '1%',
  },
});
export default ComPonent1;
