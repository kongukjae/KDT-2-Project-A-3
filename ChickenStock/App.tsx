/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

// 화면 컴포넌트 import
import HomeScreen from './Home';
import MainPage from './MainPage';

// 스택 네비게이터 생성
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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

export default App;
