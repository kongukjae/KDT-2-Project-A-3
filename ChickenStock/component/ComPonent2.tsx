import React, {useState, useEffect} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// 서버에서 받아올 데이터의 타입을 정의
interface StockData {
  stck_cntg_hour: string; // 날짜
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

  console.log('여기는 month');
  console.log(monthData);
  console.log('여기는 무엇인가');
  console.log(yearData);
  // 1. 일간 차트 요청
  useEffect(() => {
    fetch('http://10.0.2.2:5000/get_data')
      .then(response => response.json())
      .then((data: StockData[]) => {
        console.log(
          'day data stck_prpr:',
          data.map(item => item.stck_prpr),
        );
        setDayData(data); // 받아온 데이터를 그대로 사용합니다.
      });
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
  const renderChart = (data: StockData[], title: string) => {
    const isMonthData = data[0]?.stck_bsop_date != null;

    const xData = data.map(item => {
      const dateStr = isMonthData ? item.stck_bsop_date : item.stck_cntg_hour;
      // Convert the date string to a number (milliseconds since 1970)
      const date = new Date(dateStr).getTime();
      return date;
    });

    // Use a formatter to convert the timestamp back to a readable date
    const formatLabel = (value: number, _index: number) => {
      const date = new Date(value);
      return isMonthData
        ? date.toLocaleDateString().slice(0, 7)
        : date.getHours();
    };

    return (
      <View style={{height: 220, flexDirection: 'row'}}>
        <Text>{title}</Text>
        <YAxis
          data={data.map(item => item.stck_prpr)}
          contentInset={{top: 10, bottom: 10}}
          svg={{
            fill: 'black',
            fontSize: 11,
          }}
          numberOfTicks={10}
          formatLabel={(value: number) => `${value}원`}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <LineChart
            style={{flex: 1}}
            data={data.map(item => item.stck_prpr)}
            svg={{stroke: '#1B9C85'}}
            contentInset={{top: 10, bottom: 10}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10}}
            data={xData}
            formatLabel={formatLabel}
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
