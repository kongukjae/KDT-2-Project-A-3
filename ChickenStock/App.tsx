
import React from 'react';
import { View, TextInput, Button, StyleSheet,Image,Text, Alert } from 'react-native';
import login from './login_module';

const App = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    login()
  )
};


export default App;