// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Chart from './TabContents/Tab1';
// import Buy from './TabContents/Tab2';
// import Price from './TabContents/Tab3';
// import News from './TabContents/Tab4';
// import Info from './TabContents/Tab5';

import React, {useState, useEffect} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {View} from 'react-native';

// 서버에서 받아올 데이터의 타입을 정의합니다.
interface StockData {
  날짜: string;
  시가: number;
  고가: number;
  저가: number;
  종가: number;
  거래량: number;
  거래대금: number;
  등락률: number;
}

const ComPonent2 = () => {
  const [data, setData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  useEffect(() => {
    fetch('http://192.168.100.69:5000/companydetailP')
      .then(response => response.json())
      .then((data: StockData[]) => {
        // 주어진 JSON 데이터를 종가로 변환합니다. 적절하게 수정할 수 있습니다.
        const closingPrices = data.map(item => item.종가);
        const dates = data.map(item => item.날짜);
        setData(closingPrices);
        setDates(dates);
      });
  }, []);

  return (
    <View style={{height: 150, flexDirection: 'row'}}>
      <YAxis
        data={data}
        contentInset={{top: 10, bottom: 10}}
        svg={{
          fill: 'black',
          fontSize: 11,
        }}
        numberOfTicks={10}
        formatLabel={value => `${value}원`}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <LineChart
          style={{flex: 1}}
          data={data}
          svg={{stroke: 'rgb(134, 65, 244)'}}
          contentInset={{top: 10, bottom: 10}}>
          <Grid />
        </LineChart>
        <XAxis
          style={{marginHorizontal: -10}}
          data={data}
          formatLabel={(value, index) => (index % 5 === 0 ? dates[index] : '')}
          contentInset={{left: 10, right: 10}}
          svg={{fontSize: 10, fill: 'black'}}
        />
      </View>
    </View>
  );
};

export default ComPonent2;
