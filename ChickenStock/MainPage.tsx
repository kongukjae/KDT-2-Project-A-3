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
  const isDarkMode = useColorScheme() === 'dark';
  const stock_list = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/main_page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      });

      const data = await response.json();
      console.log('응답받음');
      console.log(data);
      setJsonData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    stock_list();
  }, []);

  console.log('함수 밖');
  console.log(jsonData);

  const dataArray = Object.entries(jsonData);

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

  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  type RootStackParamList = {
    ChoicePageOne: {choice: string};
    ChoicePageTwo: {choice: string};
    ChoicePageThree: {choice: string};
    ChoicePageFour: {choice: string};
    MainPage: undefined;
    Another: undefined;
  };

  type ChoicePageOneNavigationProp = StackNavigationProp<
    RootStackParamList,
    'ChoicePageTwo'
  >;
  type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

  const handleLocation = () => {
    navigation.navigate('Another');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
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
            style={styles.button}
            // onPress={handlePress}
            underlayColor="coral">
            <Text style={styles.buttonText}>등락 순</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>가격 순</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>시가총액 순</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>거래량 순</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          {dataArray.length === 0 ? (
            // 로딩 창 표시
            <ActivityIndicator size="large" color="blue" />
          ) : (
            // 데이터 표시
            dataArray.map((item, index) => {
              const name_data = item[0];
              const company_data: any = item[1]; // up_down과 current_price에서 타입 에러가 발생하므로 any로 할당함
              const up_down = company_data['등락'];
              const current_price = company_data['현재가'];

              return (
                <TouchableHighlight key={index} style={styles.view}>
                  <View>
                    <Text>{name_data}</Text>
                    <Text>등락 {up_down}</Text>
                    <Text>현재가 {current_price}</Text>
                  </View>
                </TouchableHighlight>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
