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
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';

import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  ChoicePageOne: undefined;
  ChoicePageTwo: undefined;
  ChoicePageThree: undefined;
  ChoicePageFour: undefined;
  MainPage: undefined;
  Another: undefined;
  SignUpPage: undefined;
  LoginPage: undefined;
  MyPage: undefined;
};

type ChoicePageOneNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChoicePageTwo'
>;
type ChoicePageOneRouteProp = RouteProp<RootStackParamList, 'ChoicePageTwo'>;

const TopMenuPage = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();

  const goToChoicePage = () => {
    navigation.navigate('MyPage');
  };

  return (
    <View style={styles.icon_box}>
      <Image
        source={require('./resource/Icon_search.png')}
        style={styles.icon}
      />
      <TouchableOpacity onPress={goToChoicePage}>
        <Image
          source={require('./resource/Icon_cart.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Image
        source={require('./resource/Icon_AI_chat_bot.png')}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon_box: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});

export default TopMenuPage;
