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
  Linking,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const topMenu = () => {
  return (
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
  )
}

const styles = StyleSheet.create({
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
  }
})

export default topMenu;