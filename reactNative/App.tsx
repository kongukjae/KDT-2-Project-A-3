/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
//  * @format
 */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <View>
//       <Text>
//         hello world! 좋네요 
//       </Text>
//     </View>
//     );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';

// const App = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http:/192.168.100.135:5000/api/data');
//       const data = await response.json();
//       setMessage(data.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const sendData = async () => {
//     try {
//       const response = await fetch('http://192.168.100.135:5000/api/data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: 'Hello from React Native!' }),
//       });
//       const data = await response.json();
//       setMessage(data.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Send Data" onPress={sendData} />
//       <Text>{message}</Text>
//     </View>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [message, setMessage] = useState('');

  const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.100.135:5000/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setMessage(response.message);
      }
    };

    const data = JSON.stringify({ message: 'Hello from React Native!' });
    xhr.send(data);
  };

  return (
    <View>
      <Button title="Fetch Data" onPress={fetchData} />
      <Text>{message}</Text>
    </View>
  );
};

export default App;