import React, {useState, useEffect} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface StockData {
  stck_bsop_date: string; // 날짜
  stck_clpr: number; //주간,월간 종가
  stck_oprc: number; // 시가
  stck_hgpr: number; // 고가
  stck_lwpr: number; // 저가
  // stck_prpr: number; // 종가
  cntg_vol: number; // 거래량
}

const ComPonent5 = () => {
  const [monthData, setMonthData] = useState<StockData[]>([]);

  useEffect(() => {
    fetch('http://10.0.2.2:5000/get_Wdata')
      .then(response => response.json())
      .then((data: StockData[]) => {
        setMonthData(data); // 받아온 데이터를 그대로 사용합니다.
      });
  }, []);

  // useEffect(() => {
  //   fetch('http://10.0.2.2:5000/get_Mdata')
  //     .then(response => response.json())
  //     .then((data: StockData[]) => {
  //       setYearData(data); // 받아온 데이터를 그대로 사용합니다.
  //     });
  // }, []);

  // 그릴 차트의 속성을 정의해준다.
  const renderChart = (data: StockData[], title: string) => (
    <View style={{height: 220, flexDirection: 'row'}}>
      <Text>{title}</Text>
      <YAxis
        data={data.map(item => item.stck_clpr)}
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
          data={data.map(item => item.stck_clpr)}
          svg={{stroke: '#1B9C85'}}
          contentInset={{top: 10, bottom: 10}}>
          <Grid />
        </LineChart>
        <XAxis
          style={{marginHorizontal: -10}}
          data={data.map(item => item.stck_bsop_date)}
          formatLabel={(value: string, _index: number) => value}
          contentInset={{left: 10, right: 10}}
          svg={{fontSize: 10, fill: 'black'}}
        />
      </View>
    </View>
  );
  return (
    <View>
      {renderChart(monthData, '')}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setMonthData(monthData)}>
        <Text style={styles.buttonText}>월별 데이터 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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

export default ComPonent5;
