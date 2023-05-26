import React, { useEffect } from 'react'; //! 리액트나 리액트 네이티브에서 가져와서 쓸 수 있음
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe194',
  },

  text: {
    fontSize: 40,
    color: '#1b9c85',
  }
});

const Home: React.FC = () => {
  useEffect(() => {
    // 3초 후에 로그인 페이지로 이동
    const timer = setTimeout(() => {
      // 여기에서 로그인 화면으로 전환하는 로직을 작성하세요
      console.log('Navigate to Login screen');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chicken Stock</Text>
    </View>
  );
};

export default Home;