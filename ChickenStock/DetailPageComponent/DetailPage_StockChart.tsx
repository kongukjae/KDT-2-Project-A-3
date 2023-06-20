import React, {useState, useEffect} from 'react';
import {LineChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import io from 'socket.io-client';
// 매개변수를 정의
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
// 컴포넌트2 정의, 이름과 코드를 매개변수로 받는다.
const ComPonent2: React.FC<Component2Props> = ({
  company_name,
  company_code,
}) => {
  console.log('com2');
  console.log(company_name, company_code);
  // 3. 상태변수 정의
  const [data, setData] = useState<StockData[]>([]);
  const [dayData, setDayData] = useState<StockData[]>([]);
  const [monthData, setMonthData] = useState<StockData[]>([]);
  const [currentChart, setCurrentChart] = useState<'day' | 'month' | 'year'>(
    'day',
  );
  const [isLoading, setIsLoading] = useState(true);
  console.log('차트 로딩: ', isLoading);
  // console.log('여기는 일간');
  // console.log(dayData);
  // console.log('여기는 일간');
  // console.log('여기는 month');
  // console.log(monthData);
  // console.log('여기는 month');
  // console.log('여기는 년');
  // console.log(yearData);
  // console.log('여기는 년');
  // 컴포넌트가 마운트 될때 실행되는 useEffet 즉, 페이지가 보여지면 일간 차트가 보임
  useEffect(() => {
    // 소켓 인스턴스 생성, 일종의 공용방
    const socket = io('http://3.35.39.162:5000');

    const interval = setInterval(() => {
      socket.emit('get_data', {company_code});
    }, 5000);

    socket.on('data_response', (data: StockData[]) => {
      console.log('여기뭐냐');
      console.log(
        'day data stck_prpr:',
        data.map(item => item.stck_prpr),
      );
      console.log('여기뭐냐');

      setDayData(data.reverse());
      if (currentChart === 'day') {
        setData(data);
      }
      setIsLoading(false);
    });

    return () => {
      clearInterval(interval);
      socket.off('data_response');
      socket.disconnect();
      console.log('소켓이 진짜로 꺼졌습니다.');
    };
  }, [currentChart, company_code]);

  //  2. 월간 차트 요청
  useEffect(() => {
    fetch(`http://3.35.39.162:5000/get_Mdata/${company_code}`)
      .then(response => response.json())
      .then((data: StockData[]) => {
        // 원래의 데이터에 stck_prpr 값이 없으므로 stck_clpr 값을 사용하도록 수정
        const modifiedData = data.map(item => ({
          ...item,
          stck_prpr: item.stck_clpr,
        }));

        // console.log(data);
        console.log('오는거여 마는거야');
        // console.log(
        //   'modified month data stck_prpr:',
        //   modifiedData.map(item => item.stck_prpr).reverse(),
        // );
        setMonthData(modifiedData.reverse());
        if (currentChart === 'month') {
          setData(modifiedData);
        }
      });
  }, [currentChart]);

  // 차트를 그리는 함수, 주어진 데이터를 통해서 차트를 그린다
  const renderChart = (data: StockData[], title: string) => {
    // 데이터가 없으면 아무것도 그리지 않는다.
    if (!data || data.length === 0) {
      return null;
    }
    const isDailyData = data.some(item =>
      item.hasOwnProperty('stck_cntg_hour'),
    );
    // console.log(data);
    // console.log('여기는 데이트가 무엇일까');

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

    // console.log(xData);

    return (
      <View style={{width: 365, height: 220, flexDirection: 'row'}}>
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
            svg={{stroke: '#1B9C85', strokeWidth: '3px'}}
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
    <View style={styles.root}>
      {isLoading == true ? (
        <View style={styles.loading_window}>
          <ActivityIndicator size="large" color="#1B9C85" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View>
          {data.length > 0 && renderChart(data, '')}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCurrentChart('day')}>
              <Text style={styles.buttonText}>실시간 데이터 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setCurrentChart('month')}>
              <Text style={styles.buttonText}>월별 데이터 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1B9C85',
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 5,
    width: '49.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  loading_window: {
    width: '100%',
    height: 265,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
export default ComPonent2;
