import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from './AllContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SlideComponent from './NewsComponent';
import {useEvent} from 'react-native-reanimated';
import TopMenuPage from './TopMenuPage';

function Main_page(): JSX.Element {
  const [jsonData, setJsonData] = useState<any>({});
  const [dataArray, setDataArray] = useState<any[]>([]); // dataArray 상태와 업데이트 함수 선언
  const [selectedButton, setSelectedButton] = useState('시가총액'); // 버튼 색상 변경을 위한 상태 선언, 페이지 로드 시 시가총액을 선택한 것으로 표현
  const isDarkMode = useColorScheme() === 'dark';
  // 메인 페이지 진입 시 서버에게 주식 리스트 데이터 요청하는 함수
  const stock_list = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/main_page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      });

      const data = await response.json(); // 서버로부터 json 형식으로 데이터를 응답받음
      // 서버에서 시가총액 기준으로 정렬한 데이터를 보내주지만 json 형식은 순서를 보장하지 않기 때문에 순서가 뒤섞인다.
      // 따라서 데이터를 sort() 메서드를 이용해 다시한번 시가총액 기준으로 정렬시킴
      const dataArray = Object.entries(data).sort((a:any, b:any) => { // type 에러가 발생하므로 any 형식으로 지정해둠 [웨않뒈는고야...]
        const marketCapA = parseInt(a[1]['시가총액']);  
        const marketCapB = parseInt(b[1]['시가총액']);
        return marketCapB - marketCapA; // 내림차순 정렬
      });
      setJsonData(data);
      setDataArray(dataArray)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    stock_list();
  }, []);

  console.log('함수 밖');
  console.log(jsonData);

  // [ 정렬 버튼 기능 ]
  const dataArraySortByCurrentPrice = (standard:string) => {  // 
    const sortDataArray = [...dataArray].slice().sort((a:any, b:any) => {
      const currentPriceA = parseInt(a[1][standard]);
      const currentPriceB = parseInt(b[1][standard]);
      return currentPriceB - currentPriceA;
    })
    setDataArray(sortDataArray);
  }

  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
    dataArraySortByCurrentPrice(buttonName);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // 무한 스크롤 관련
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewCount, setViewCount] = useState(16);
  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    // 무한스크롤 동작 조건: 화면상의 높이값 + 스크롤의 위치값 >= 페이지 전체 높이 - 50px 일 때 요소를 추가적으로 생성
    const reachedBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    console.log(`layoutMeasurement.height`);
    console.log(`${layoutMeasurement.height}`);
    console.log(`contentOffset.y`);
    console.log(`${contentOffset.y}`);
    console.log(`contentSize.height`);
    console.log(`${contentSize.height}`);
    if (reachedBottom) {
      setViewCount(viewCount + 4); // 추가될 View 개수
    }
    setScrollPosition(contentOffset.y);
  };

  // 컨텍스트
  const {userId} = useContext(AuthContext);
  console.log('컨텍스트 테스트')
  console.log(userId)

  const navigation = useNavigation<MainPageNavigationProp>();

  // type AnotherScreenParams = {
  //   company_name: string;
  // };

  type RootStackParamList = {
    ChoicePageOne: {choice: string};
    ChoicePageTwo: {choice: string};
    ChoicePageThree: {choice: string};
    ChoicePageFour: {choice: string};
    MainPage: undefined;
    Another: {company_name: string},
  };

  type MainPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Another'
  >;
  // type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

  // 상세 페이지로 이동 / 누른 회사 이름을 인자로 전달
  const stockChoice = (company_name: string) => {
    navigation.navigate('Another', {company_name});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {dataArray.length === 0 ? (
        // 로딩 창 표시
        <View style={styles.loading_window}>
          <Image 
          source={require('./image/logo.png')} 
          style={styles.LogoImage}
          />
          <Text style={styles.loadingText}>Loading...</Text>
          <ActivityIndicator size="large" color="#E8F6EF" />
        </View>
      ) : (<ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={2}>
        <View style={styles.header}>
          <View>
            <Image
              source={require('./resource/logo.jpg')}
              style={styles.logo}
            />
          </View>
          <View style={styles.header_inner}>
            <View>
              <TopMenuPage></TopMenuPage>
            </View>
            <View style={styles.login_box}>
              <Text style={styles.login_user_name}>{userId}님 환영합니다.</Text>
            </View>
          </View>
        </View>
        <View style={styles.article_area}>
          <SlideComponent />
        </View>
        <View style={styles.flex_row}>
          <TouchableHighlight
            style={[styles.button, selectedButton === '등락' ? styles.selectedButton : null,]}
            onPress={() => handleButtonPress('등락')}>
            <Text style={styles.buttonText}>등락 순</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, selectedButton === '현재가' ? styles.selectedButton : null,]}
            onPress={() => handleButtonPress('현재가')}>
            <Text style={styles.buttonText}>가격 순</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, selectedButton === '시가총액' ? styles.selectedButton : null,]}
            onPress={() => handleButtonPress('시가총액')}>
            <Text style={styles.buttonText}>시가총액 순</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, selectedButton === '거래량' ? styles.selectedButton : null,]}
            onPress={() => handleButtonPress('거래량')}>
            <Text style={styles.buttonText}>거래량 순</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          {dataArray.map((item, index) => {
              const name_data = item[0];
              const company_data: any = item[1]; // up_down과 current_price에서 타입 에러가 발생하므로 any로 할당함
              const up_down = company_data['등락'];
              const current_price = company_data['현재가'];
              const market_cap = company_data['시가총액'];

              return (
                <TouchableHighlight key={index} style={styles.view} onPress={() => {stockChoice(name_data)}}>
                  <View>
                    <Text>{name_data}</Text>
                    <Text>등락 {up_down}</Text>
                    <Text>현재가 {current_price}</Text>
                    <Text>시가총액 {market_cap}</Text>
                  </View>
                </TouchableHighlight>
              );
            })
          }
        </View>
      </ScrollView>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ 
  loading_window: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9C85'
  },
  loadingText: {
    fontSize: 40,
    fontWeight: '700'
  },
  infiniteScrollArea: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  view: {
    width: '48%',
    height: 100,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'blue',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logo: {
    width: 80,
    height: 80,
  },
  LogoImage: {
    width: 200,
    height: 200,
  },
  flex_row: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon_box: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_inner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 277,
  },
  article_area: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#1B9C85',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#4C4C6D',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  login_user_name: {
    fontSize: 20,
  },
  login_box: {
    width: '100%',
    height: 40,
    backgroundColor: '#1B9C85',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main_page;
