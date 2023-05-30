import React, { useState } from 'react';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Main_page(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
            style={styles.image}
            />
          </View>
          <View style={styles.header_inner}>
            <View style={styles.icon_box}>
              <Image
              source={require('./resource/Icon_search.png')}
              />
              <Image
              source={require('./resource/Icon_cart.png')}
              />
              <Image
              source={require('./resource/Icon_AI_chat_bot.png')}
              />
            </View>
            <Text>___님 로그인하셨습니다.</Text>
          </View>
        </View>
        <View style={styles.article_area}>
          <View style={styles.flex_row}>
            <Text>기사 1 제목 </Text>
            <Text>기사 1 내용</Text>
          </View>
          <View style={styles.flex_row}>
            <Text>기사 2 제목 </Text>
            <Text>기사 2 내용</Text>
          </View>
          <View style={styles.flex_row}>
            <Text>기사 3 제목 </Text>
            <Text>기사 3 내용</Text>
          </View>
          <View style={styles.flex_row}>
            <Text>기사 4 제목 </Text>
            <Text>기사 4 내용</Text>
          </View>
          <View style={styles.flex_row}>
            <Text>기사 5 제목 </Text>
            <Text>기사 5 내용</Text>
          </View>
        </View>
        <View style={styles.flex_row}>
          <TouchableHighlight
          style={styles.button}
          // onPress={handlePress}
          underlayColor="coral">
            <Text>등락 순</Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.button}>
            <Text>가격 순</Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.button}>
            <Text>시가총액 순</Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.button}>
            <Text>거래량 순</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
        {[...Array(viewCount)].map((_, index) => (
          <View key={index} style={styles.view} />
        ))}
        </View>
        
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
  image: {
    width: 80,
    height: 80,
  },
  flex_row:{
    display: 'flex',
    flexDirection: 'row',
  },
  icon_box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header_inner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 277,
    borderWidth: 1,
    borderColor: 'red'
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Main_page;