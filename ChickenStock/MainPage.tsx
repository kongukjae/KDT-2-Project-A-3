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
  // const [jsonData, setJsonData] = useState<any>({});
  const [dataArray, setDataArray] = useState<any[]>([]); // dataArray 상태와 업데이트 함수 선언
  const [selectedButton, setSelectedButton] = useState('시가총액'); // 버튼 색상 변경을 위한 상태 선언, 페이지 로드 시 시가총액을 선택한 것으로 표현
  // console.log('선택된 버튼', selectedButton)
  const isDarkMode = useColorScheme() === 'dark';
  // 메인 페이지 진입 시 서버에게 주식 리스트 데이터 요청하는 함수
  const stock_list = async (selectedButton: string) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/main_page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json(); // 서버로부터 json 형식으로 데이터를 응답받음
      // 서버에서 시가총액 기준으로 정렬한 데이터를 보내주지만 json 형식은 순서를 보장하지 않기 때문에 순서가 뒤섞인다.
      // 따라서 데이터를 sort() 메서드를 이용해 다시한번 시가총액 기준으로 정렬시킴
      // console.log('데이터 정렬 전 : ', selectedButton)
      const dataArray = Object.entries(data).sort((a: any, b: any) => {
        // type 에러가 발생하므로 any 형식으로 지정해둠 [웨않뒈는고야...]
        let key: keyof (typeof a)[1];
        // console.log('데이터 정렬 타입: ', selectedButton)
        switch (selectedButton) {
          case '등락':
            key = '등락';
            break;
          case '현재가':
            key = '현재가';
            break;
          case '시가총액':
            key = '시가총액';
            break;
          case '거래량':
            key = '거래량';
            break;
          default:
            key = '시가총액';
        }
        const sortA = parseInt(a[1][key]);
        const sortB = parseInt(b[1][key]);
        return sortB - sortA; // 내림차순 정렬
      });
      // setJsonData(data);
      setDataArray(dataArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      stock_list(selectedButton);
    }, 3000);

    stock_list(selectedButton);

    return () => {
      clearInterval(interval);
    };
  }, [selectedButton]);

  // console.log('함수 밖');
  // console.log(jsonData);

  // [ 정렬 버튼 기능 ]
  const dataArraySortByCurrentPrice = (standard: string) => {
    //
    const sortDataArray = [...dataArray].sort((a: any, b: any) => {
      const currentPriceA = parseInt(a[1][standard]);
      const currentPriceB = parseInt(b[1][standard]);
      return currentPriceB - currentPriceA;
    });
    setDataArray(sortDataArray);
  };

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
  console.log(userId);

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
    Another: {company_name: string, company_code: string},
  };

  type MainPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Another'
  >;
  // type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

  // 상세 페이지로 이동 / 누른 회사 이름을 인자로 전달
  const stockChoice = (company_name: string, company_code: string) => {
    navigation.navigate('Another', {company_name, company_code});
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
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          scrollEventThrottle={2}>
          <View style={styles.header}>
            <View style={styles.logoView}>
              <Image
                source={require('./image/logo_G.png')}
                style={styles.logoImg}
              />
              <Text style={styles.logoText}>Chicken Stock</Text>
            </View>
            <View style={styles.header_inner}>
              <View>
                <TopMenuPage></TopMenuPage>
              </View>
              <View style={styles.login_box}>
                <Text style={styles.login_user_name}>
                  {userId}님 환영합니다.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.article_area}>
            <SlideComponent />
          </View>
          <View style={[styles.flex_row, styles.marginLeft_015P]}>
            <TouchableHighlight
              style={[
                styles.button,
                selectedButton === '등락' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('등락')}>
              <Text style={styles.buttonText}>등락 순</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.button,
                selectedButton === '현재가' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('현재가')}>
              <Text style={styles.buttonText}>가격 순</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.button,
                selectedButton === '시가총액' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('시가총액')}>
              <Text style={styles.buttonText}>시가총액 순</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.button,
                selectedButton === '거래량' ? styles.selectedButton : null,
              ]}
              onPress={() => handleButtonPress('거래량')}>
              <Text style={styles.buttonText}>거래량 순</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.container}>
            {dataArray.map((item, index) => {
              const name_data = item[0];
              const company_data: any = item[1]; // up_down과 current_price에서 타입 에러가 발생하므로 any로 할당함
              const company_code = company_data['종목코드']
              const up_down = parseInt(company_data['등락']).toLocaleString();
              const current_price = parseInt(
                company_data['현재가'],
              ).toLocaleString();
              return (
                <TouchableHighlight key={index} style={styles.view} onPress={() => {stockChoice(name_data, company_code)}}>
                  <View style={styles.flex_col_center}>
                    <View
                      style={[
                        styles.width_100P,
                        styles.height_50P,
                        styles.flex_center,
                      ]}>
                      <Text>{name_data}</Text>
                    </View>
                    <View
                      style={[
                        styles.flex_row,
                        styles.flex_center,
                        styles.space_evenly,
                        styles.width_100P,
                        styles.height_50P,
                      ]}>
                      <Text>현재가 {current_price}</Text>
                      {parseInt(up_down) < 0 ? (
                        <Text style={styles.down_style}>▼ {up_down}</Text>
                      ) : (
                        <Text style={styles.up_style}>▲ {up_down}</Text>
                      )}
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  up_style: {
    color: 'red',
  },
  down_style: {
    color: 'blue',
  },
  logoView: {
    width: 120,
    height: 85,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#4C4C6D',
    fontSize: 16,
    fontFamily: 'BagelFatOne-Regular',
  },
  marginLeft_015P: {
    marginLeft: '1.5%',
  },
  loading_window: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9C85',
  },
  loadingText: {
    fontSize: 40,
    fontWeight: '700',
  },
  infiniteScrollArea: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  view: {
    width: '48%',
    height: 100,
    backgroundColor: 'lightgray',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#999999',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
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
  logoImg: {
    width: 60,
    height: 60,
  },
  LogoImage: {
    width: 200,
    height: 200,
  },
  flex_row: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  space_evenly: {
    justifyContent: 'space-evenly',
  },
  flex_col_center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  width_100P: {
    width: '100%',
  },
  height_50P: {
    height: '50%',
  },
  test_box: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Main_page;
