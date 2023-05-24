import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 16,
  }
});

const Login: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
    </View>
  );
};

export default Login;