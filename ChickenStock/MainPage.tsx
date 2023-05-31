import React, {useState} from 'react';
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
  Linking,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

function Main_page(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const articleLinkPress = () => {
    Linking.openURL('https://www.naver.com/');
  };

  const [viewCount, setViewCount] = useState(50); // 초기 View 개수

  const addViews = () => {
    setViewCount(viewCount + 2); // 추가될 View 개수
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        onScroll={addViews}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <View>
            <Image
              source={require('./resource/logo.jpg')}
              style={styles.logo}
            />
          </View>
          <View style={styles.header_inner}>
            <View style={styles.icon_box}>
              <Image
                source={require('./resource/Icon_search.png')}
                style={styles.icon}
              />
              <Image
                source={require('./resource/Icon_cart.png')}
                style={styles.icon}
              />
              <Image
                source={require('./resource/Icon_AI_chat_bot.png')}
                style={styles.icon}
              />
            </View>
            <View style={styles.login_box}>
              <Text style={styles.login_user_name}>
                ______님 로그인하셨습니다.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.article_area}>
          <TouchableHighlight onPress={articleLinkPress}>
            <View style={styles.flex_row}>
              <Text>기사 1 제목 </Text>
              <Text>기사 1 내용</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={articleLinkPress}>
            <View style={styles.flex_row}>
              <Text>기사 2 제목 </Text>
              <Text>기사 2 내용</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={articleLinkPress}>
            <View style={styles.flex_row}>
              <Text>기사 3 제목 </Text>
              <Text>기사 3 내용</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={articleLinkPress}>
            <View style={styles.flex_row}>
              <Text>기사 4 제목 </Text>
              <Text>기사 4 내용</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={articleLinkPress}>
            <View style={styles.flex_row}>
              <Text>기사 5 제목 </Text>
              <Text>기사 5 내용</Text>
            </View>
          </TouchableHighlight>
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
          {[...Array(viewCount)].map((_, index) => (
            <View key={index} style={styles.view} />
          ))}
        </View>

        {/* const handleChoice = (choice: string) => {
    navigation.navigate('Another');
    console.log(`${choice}`);
  }; */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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