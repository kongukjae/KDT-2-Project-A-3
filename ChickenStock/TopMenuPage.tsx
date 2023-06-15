import React, {useState, useEffect} from 'react';
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
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {io, Socket} from 'socket.io-client';

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
  const [modalVisible, setModalVisible] = useState(false);
  console.log("test" ,modalVisible)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   const socket = io('http://10.0.2.2:5000');
  //   if (modalVisible) {
  //     return () => {
  //       socket.emit('modalOpen');
  //       socket.on('clientConnect', () => {
  //         console.log('연결됨');
  //         console.log("on", modalVisible);
  //       });
  //     }
      
  //   } else {
  //     return () => {
  //       socket.emit('modalClose');
  //       socket.disconnect();
  //       socket.off('clientConnect');
  //       console.log('연결 끊어짐');
  //       console.log("off", modalVisible);
  //     }
      
  //   }
  // }, [modalVisible]);

  useEffect(() => {
    let socket = io('http://10.0.2.2:5000', {
      transports: ['websocket'], // WebSocket 전송 방식 사용
    });
  
    if (modalVisible) {
      socket.connect();
      socket.on('clientConnect', () => {
        console.log('연결됨');
        console.log("on", modalVisible);
      });
  
      return () => {
        socket.disconnect();
        console.log('연결 끊어짐');
        console.log("off", modalVisible);
      };
    } else {
      socket.disconnect();
      console.log('연결 끊어짐');
      console.log("off", modalVisible);
    }
  }, [modalVisible]);

  const openModal = () => {
    setModalVisible(true);
    console.log("change1", modalVisible)
  };

  const closeModal = () => {
    setModalVisible(false);
    console.log("change2", modalVisible)
  };

  const handleOverlayPress = () => {
    closeModal();
    // 모달 이외의 영역을 터치했을 때 수행할 동작을 추가할 수 있습니다.
  };

  const goToChoicePage = () => {
    navigation.navigate('MyPage');
  };

  const handleSend = () => {
    // 메시지 전송 로직을 추가할 수 있습니다.
    console.log('Sending message:', message);

    setMessages(prevMessages => [...prevMessages, message]);

    setMessage('');
  };

  return (
    <View>
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
        <TouchableOpacity onPress={openModal}>
          <Image
            source={require('./resource/Icon_AI_chat_bot.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={closeModal}>
          <TouchableWithoutFeedback onPress={handleOverlayPress}>
            <View style={styles.modalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                  <Text style={styles.chatTitle}>
                    주식 용어에 대해서 물어보세요!
                  </Text>
                  <View style={styles.chatContainer}>
                    <ScrollView
                      contentContainerStyle={styles.chatContent}
                      showsVerticalScrollIndicator={false}>
                      {messages.map((msg, index) => (
                        <Text key={index} style={styles.chatBox}>
                          {msg}
                        </Text>
                      ))}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="메시지를 입력하세요"
                        value={message}
                        onChangeText={setMessage}
                      />
                      <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Send</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E8F6EF',
    width: '80%',
    height: '80%',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4C4C6D',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    alignItems: 'flex-end',
    marginBottom: 10,
    flexGrow: 1,
    paddingBottom: 8,
  },
  chatBox: {
    minWidth: 50,
    marginTop: 10,
    borderColor: '#1B9C85',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TopMenuPage;
