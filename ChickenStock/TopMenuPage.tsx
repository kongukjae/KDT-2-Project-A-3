import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
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

interface Message {
  content: string;
  sender: string;
}

const TopMenuPage = () => {
  const navigation = useNavigation<ChoicePageOneNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // 모달 창을 여는 함수
  const openModal = () => {
    setModalVisible(true);
    setSocket(io('http://10.0.2.2:5000')); //* 소켓 설정
  };

  // 모달 창을 닫는 함수
  const closeModal = () => {
    setModalVisible(false);
    if (socket) {
      socket.disconnect(); //* 모달창 닫혔을 때 소켓 연결 해제
      setSocket(null);
    }
  };

  const handleOverlayPress = () => {
    closeModal(); // 모달창이 아닌 다른 부분을 닫았을 때 함수 실행
  };

  // 마이페이지 아이콘 눌렀을 때 마이페이지로 이동하는 함수
  const goToChoicePage = () => {
    navigation.navigate('MyPage');
  };

  // 전송 버튼을 눌렀을 때 실행되는 함수
  const handleSend = () => {
    if (socket) {
      console.log('Sending message:', message);
      socket.emit('message', message); // 'message' 이벤트 리스너 전달
      const userMessage: Message = {
        content: message,
        sender: 'user',
      };
      setMessages(prevMessages => [...prevMessages, userMessage]); //유저가 보내는 함수 및 이전에 보냈던 것을 가져와서 useState에 담음
    }
    setMessage(''); // 메시지 입력창을 빈 값으로 초기화
  };

  // Effect()를 처리하는 코드
  useEffect(() => {
    if (socket) {
      socket.on('response', data => { // 'response' 이벤트 리스너를 받음
        console.log(data);
        let responseData = {
          content: data['content'],
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, responseData]);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    }
    // Clean-up 함수 작성 부분
    return () => {
      if (socket) {
        socket.off('response'); // 이벤트 핸들러 해제
      }
    };
  }, [socket]);

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
                      //! ScrollView 내부의 컨텐츠에 대한 스타일을 지정
                      contentContainerStyle={styles.chatContent}
                      //! 세로 스크롤바의 표시 여부
                      showsVerticalScrollIndicator={false}
                      //! ref: React 컴포넌트에서 DOM 요소나 컴포넌트 인스턴스에 접근하기 위한 방법
                      ref={scrollViewRef}>
                      {/* messages의 배열을 순회 */}
                      {messages.map((msg, index) => {
                        // msg의 내용과 받는사람으로 키값 생성
                        const key = `${msg.content}-${msg.sender}`;
                        return (
                          <View
                            style={[
                              styles.chatBox,
                              // 만약 sender가 user이면 userMessage 스타일로 아니면 botMessage스타일로
                              msg.sender === 'user'
                                ? styles.userMessage
                                : styles.botMessage,
                            ]}
                            key={key}>
                            <Text style={styles.chatText}>{msg.content}</Text>
                          </View>
                        );
                      })}
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
    padding: 10,
    borderColor: '#4C4C6D',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatText: {
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
    backgroundColor: '#1B9C85',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userMessage: {
    backgroundColor: '#1B9C85',
  },
  botMessage: {
    backgroundColor: '#FFE194',
  },
});

export default TopMenuPage;
