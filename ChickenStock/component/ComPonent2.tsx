import React, {useState, useEffect} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import io from 'socket.io-client';
// 서버에서 받아올 데이터의 타입을 정의
interface StockData {
  stck_cntg_hour: string; // 시간
  stck_bsop_date: string; // 주간,월간 날짜
  stck_clpr: number; //주간,월간 종가
  stck_oprc: number; // 시가
  stck_hgpr: number; // 고가
  stck_lwpr: number; // 저가
  stck_prpr: number; // 종가
  cntg_vol: number; // 거래량
}

const ComPonent2 = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [dayData, setDayData] = useState<StockData[]>([]);
  const [monthData, setMonthData] = useState<StockData[]>([]);
  const [yearData, setYearData] = useState<StockData[]>([]);

  console.log(dayData);
  console.log('여기는 month');
  console.log(monthData);
  console.log('여기는 무엇인가');
  console.log(yearData);
  // 소켓 인스턴스 생성, 일종의 공용방
  const socket = io('http://10.0.2.2:5000');

  // 1. 일간 차트 요청
  // useEffect(() => {
  //   fetch('http://10.0.2.2:5000/get_data')
  //     .then(response => response.json())
  //     .then((data: StockData[]) => {
  //       console.log(
  //         'day data stck_prpr:',
  //         data.map(item => item.stck_prpr),
  //       );
  //       setDayData(data); // 받아온 데이터를 그대로 사용합니다.
  //     });
  // }, []);
  useEffect(() => {
    socket.emit('get_data');

    socket.on('data_response', (data: StockData[]) => {
      console.log(
        'day data stck_prpr:',
        data.map(item => item.stck_prpr),
      );
      setDayData(data);
      setData(data);
      socket.emit('get_data');

      console.log(data);
      console.log('오는거여 마는거야');
    });

    return () => {
      socket.off('data_response');
    };
  }, []);

  //  2. 월간 차트 요청
  useEffect(() => {
    fetch('http://10.0.2.2:5000/get_Mdata')
      .then(response => response.json())
      .then((data: StockData[]) => {
        // 원래의 데이터에 stck_prpr 값이 없으므로 stck_clpr 값을 사용하도록 수정
        const modifiedData = data.map(item => ({
          ...item,
          stck_prpr: item.stck_clpr,
        }));
        console.log(
          'modified month data stck_prpr:',
          modifiedData.map(item => item.stck_prpr).reverse(),
        );
        setMonthData(modifiedData.reverse());
      });
  }, []);
  // 3. 연간 차트 요청
  useEffect(() => {
    fetch('http://10.0.2.2:5000/get_Ydata')
      .then(response => response.json())
      .then((data: StockData[]) => {
        const modifiedData = data.map(item => ({
          ...item,
          stck_prpr: item.stck_clpr,
        }));
        console.log(
          'modified YEAR data stck_prpr:',
          modifiedData.map(item => item.stck_prpr).reverse(),
        );
        setYearData(modifiedData.reverse());
      });
  }, []);

  const getXData = (item: StockData, isDailyData: boolean): string => {
    if (isDailyData) {
      // 일간 데이터일 경우 'HH:MM:SS' 형태의 시간 문자열을 반환
      return item.stck_cntg_hour;
    } else {
      // 월간, 년간 데이터일 경우 'YYYY-MM-DD' 형태의 날짜 문자열을 반환
      const date = item.stck_bsop_date;
      return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(10, 8)}`;
    }
  };

  const renderChart = (data: StockData[], title: string) => {
    // 데이터가 없으면 아무것도 그리지 않는다.
    if (!data || data.length === 0) {
      return null;
    }
    const isDailyData = data.some(item =>
      item.hasOwnProperty('stck_cntg_hour'),
    );
    const xData: string[] = data.map(item => getXData(item, isDailyData));
    console.log(data);
    console.log('여기는 데이트가 무엇일까');

    // 일단 임시방편, 지속적인 0의 출력으로 강제로 나오게 함
    // const xData = data.map(item => {
    //   const dateStr = isDailyData ? item.stck_cntg_hour : item.stck_bsop_date;
    //   const date = new Date(`2023-06-14T${dateStr}Z`).getTime();
    //   console.log(dateStr); // 원시적인 방법으로 dateStr 값을 출력

    //   return {
    //     dateStr, // dateStr 값을 직접 반환
    //     date,
    //   };
    // });

    // console.log(xData);

    // 배열을 순회, true 이면 hour(일간)를 dateStr에 할당
    // 그렇지 않다면, bsop_date를 할당
    // const xData = data.map(item => {
    //   console.log(item.stck_cntg_hour);
    //   console.log(item.stck_bsop_date);
    //   console.log(item);
    //   const dateStr = isDailyData
    //     ? `2023-06-14T${item.stck_cntg_hour}Z`
    //     : `${item.stck_bsop_date.slice(0, 4)}-${item.stck_bsop_date.slice(
    //         4,
    //         6,
    //       )}-${item.stck_bsop_date.slice(6, 8)}T00:00:00Z`;
    //   const date = new Date(`2023-06-14T${dateStr}Z`).getTime();
    //   console.log(dateStr);
    //   console.log(date);
    //   console.log(new Date(date).toUTCString());
    //   console.log(new Date(date).toString());
    //   console.log('여기는무엇인가');

    //   return date;
    // });
    // console.log(xData);

    // X축 라벨을 포맷하는 함수, 주어진 타임스탬프의 값을 받아서 문자열로 반환, 대상은 isDailyData
    // const formatLabel = (value: number, _index: number) => {
    //   const date = new Date(value);
    //   const formattedLabel = isDailyData
    //     ? `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}` // UTC 기준으로 시간 가져오기
    //     : `${date.getUTCFullYear()}-${
    //         date.getUTCMonth() + 1
    //       }-${date.getUTCDate()}`; // 날짜 가져오기 (YYYY-MM-DD 형식)
    //   console.log(formattedLabel); // 로그 출력
    //   return formattedLabel;
    // };

    return (
      <View
        style={{height: 220, flexDirection: 'row', backgroundColor: 'gray'}}>
        <Text>{title}</Text>
        <YAxis
          data={data.map(item => item.stck_prpr)}
          contentInset={{top: 10, bottom: 10}}
          svg={{
            fill: 'black',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value: number) => `${value}원`}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={data.map(item => item.stck_prpr)}
            svg={{stroke: '#1B9C85', strokeWidth: '7px'}}
            contentInset={{top: 10, bottom: 10}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -350}}
            data={xData}
            // formatLabel={formatLabel}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'black'}}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      {data.length > 0 && renderChart(data, '')}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setData(dayData)}>
          <Text style={styles.buttonText}>일별 데이터 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setData(monthData)}>
          <Text style={styles.buttonText}>월별 데이터 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setData(yearData)}>
          <Text style={styles.buttonText}>년 데이터 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1B9C85',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
export default ComPonent2;
