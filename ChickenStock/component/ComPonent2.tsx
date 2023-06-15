import React, {useState, useEffect} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import io from 'socket.io-client';

type Component2Props = {
  company_name: string;
  company_code: string;
};

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
const ComPonent2: React.FC<Component2Props> = ({ company_name, company_code }) => {
  console.log('com2')
  console.log(company_name, company_code)
  const [data, setData] = useState<StockData[]>([]);
  const [dayData, setDayData] = useState<StockData[]>([]);
  const [monthData, setMonthData] = useState<StockData[]>([]);
  const [yearData, setYearData] = useState<StockData[]>([]);
  const [currentChart, setCurrentChart] = useState<'day' | 'month' | 'year'>(
    'day',
  );
  console.log('여기는 일간');
  console.log(dayData);
  console.log('여기는 일간');
  console.log('여기는 month');
  console.log(monthData);
  console.log('여기는 month');
  console.log('여기는 년');
  console.log(yearData);
  console.log('여기는 년');

  useEffect(() => {
    // 소켓 인스턴스 생성, 일종의 공용방
    const socket = io('http://10.0.2.2:5000');

    socket.emit('get_data');
    socket.on('data_response', (data: StockData[]) => {
      console.log(
        'day data stck_prpr:',
        data.map(item => item.stck_prpr),
      );
      setDayData(data.reverse());
      socket.emit('get_data');
      if (currentChart === 'day') {
        setData(data);
      }
      // setData(data);

      console.log(data);
      console.log('오는거여 마는거야');
    });

    return () => {
      socket.off('data_response');
    };
  }, [currentChart]);

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
        if (currentChart === 'month') {
          setData(modifiedData);
        }
      });
  }, [currentChart]);
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
          '수정된 YEAR data stck_prpr:',
          modifiedData.map(item => item.stck_prpr).reverse(),
        );
        setYearData(modifiedData.reverse());
        if (currentChart === 'year') {
          setData(modifiedData);
        }
      });
  }, [currentChart]);

  const renderChart = (data: StockData[], title: string) => {
    // 데이터가 없으면 아무것도 그리지 않는다.
    if (!data || data.length === 0) {
      return null;
    }
    const isDailyData = data.some(item =>
      item.hasOwnProperty('stck_cntg_hour'),
    );
    console.log(data);
    console.log('여기는 데이트가 무엇일까');

    // 배열을 순회, true 이면 hour(일간)를 dateStr에 할당
    // 그렇지 않다면, bsop_date를 할당
    const xData = data.map(item => {
      return isDailyData
        ? item.stck_cntg_hour
        : new Date(item.stck_bsop_date).toLocaleDateString();
    });

    const formatLabel = (value: string, index: number) => {
      // "stck_cntg_hour"에서는 30분 간격으로 라벨 표시
      if (isDailyData) {
        if (
          xData[index].slice(3, 5) === '00' ||
          xData[index].slice(3, 5) === '30'
        ) {
          return xData[index].slice(0, 5);
        }
      }
      // "bsop_date"에서는 5개 단위로 라벨 표시
      else {
        if (index % 2 === 0) {
          return xData[index].slice(0, 4);
        }
      }
      return ''; // 위의 조건을 충족하지 않는 경우 빈 문자열 반환
    };

    console.log(xData);

    return (
      <View style={{height: 220, flexDirection: 'row'}}>
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
            svg={{stroke: '#1B9C85', strokeWidth: '6px'}}
            contentInset={{top: 10, bottom: 10}}>
            <Grid />
          </LineChart>
          <XAxis
            data={data}
            formatLabel={formatLabel}
            contentInset={{left: 10, right: 10}}
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
          onPress={() => setCurrentChart('day')}>
          <Text style={styles.buttonText}>일별 데이터 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentChart('month')}>
          <Text style={styles.buttonText}>월별 데이터 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentChart('year')}>
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
