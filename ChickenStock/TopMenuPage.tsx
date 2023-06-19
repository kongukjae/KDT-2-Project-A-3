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
  Another: {company_name: string, company_code: string},
  SignUpPage: undefined;
  LoginPage: undefined;
  MyPage: undefined;
};

type TopMenuNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Another'
  >;

interface Message {
  content: string;
  sender: string;
}

const TopMenuPage = () => {
  const navigation = useNavigation<TopMenuNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPress, setSearchPress] = useState(false);
  const [searchRes, setSearchRes] = useState(null)
  console.log("press0101: ", searchPress)

  //! AI챗봇 기능 부분

  //* 모달창이 열렸을 때의 함수
  const openModal = () => {
    setModalVisible(true);
    setSocket(io('http://10.0.2.2:5000')); //* 소켓 설정
  };

  //* 모달 창을 닫혔을 때의 함수
  const closeModal = () => {
    setModalVisible(false);
    if (socket) {
      socket.disconnect(); //* 모달창 닫혔을 때 소켓 연결 해제
      setSocket(null);
    }
  };

  const handleOverlayPress = () => {
    closeModal(); //* 모달창이 아닌 다른 부분을 닫았을 때 함수 실행
  };

  //* 마이페이지 아이콘 눌렀을 때 마이페이지로 이동하는 함수
  const goToChoicePage = () => {
    navigation.navigate('MyPage');
  };

  //* 전송 버튼을 눌렀을 때 실행되는 함수
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

  //* Effect()를 처리하는 코드
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
    //* Clean-up 함수 작성 부분
    return () => {
      if (socket) {
        socket.off('response'); // 이벤트 핸들러 해제
      }
    };
  }, [socket]);

  //! 검색창 관련
  useEffect(() => {
    // 검색 버튼이 눌렸을 경우 동작 할 코드
    // 1. Textinput에 적힌 기업 이름을 서버에 보냄
    // 2. 서버는 들어온 요청 데이터를 보고 API와 통신하여 해당 기업을 찾아서 응답
    // 3. 응답 받은 데이터를 이용해 View 태그를 추가로 만들어냄
    console.log('test search', searchTerm)
    //* 검색 버튼이 눌렸을 경우 동작 할 코드
    if (searchPress) {
      console.log('searchPress가 true')
      search_stock();
      // searchPress 값을 초기화 시켜 줌
      setSearchPress(false)
    }
  }, [searchPress])

  const closeSearch = () => {
    setSearchVisible(false);
  }

  const openSearch = () => {
    setSearchVisible(true);
  }

  // 모달 창 바깥을 클릭하거나 닫기 버튼을 누를 경우, 모달 창을 닫고 검색 결과를 초기화
  const handleSearchOverlayPress = () => {
    closeSearch();
    setSearchRes(null)
  }

  const handleSearch = () => {
    console.log('search : ', searchTerm);
    setSearchPress(true)
  }
  // 서버에 입력된 값을 전달하고 응답을 받아오는 함수
  const search_stock = async() => {
    // console.log('search_stock 함수 실행 됨');
    const data = searchTerm;
    // console.log('data', data)
    try {
      const search_req = await fetch('http://10.0.2.2:5000/search_stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const search_res = await search_req.json();
      console.log('검색 결과 응답: ', search_res);
      setSearchRes(search_res);
    } catch(error) {
      console.error(error);
    }
  }

  // 상세 페이지로 이동 / 누른 회사 이름과 코드를 인자로 전달
  const stockSearchChoice = (company_name: string, company_code: string) => {
    setSearchVisible(false);
    setSearchRes(null)
    navigation.navigate('Another', {company_name, company_code});
  };

  return (
    <View>
      <View style={styles.icon_box}>
        <TouchableOpacity onPress={openSearch}>
          <Image
            source={require('./resource/Icon_search.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
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
                              //* 만약 sender가 user이면 userMessage 스타일로 아니면 botMessage스타일로
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
      {/* 검색 모달 창 */}
      <View>
        <Modal
        visible={searchVisible}
        transparent={true}
        onRequestClose={closeSearch}>
          <TouchableWithoutFeedback onPress={handleSearchOverlayPress}>
            <View style={styles.searchModalBackdrop}>
              <TouchableWithoutFeedback>
                <View style={styles.searchModalContent}>
                  <TouchableOpacity
                    onPress={closeSearch}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style = {styles.searchInput}
                      // 입력이 생길 때 마다 searchTerm 변수를 갱신함
                      onChangeText={(text) => setSearchTerm(text)}
                      placeholder = '종목 명을 입력하세요'
                    />
                    <TouchableOpacity
                      style={styles.searchButton}
                      // 검색 버튼을 누르면 마지막으로 입력 되어 있던 값을 서버로 전송함
                      onPress={handleSearch}>
                      <Text>검색</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {/* 검색 결과 출력 */}
                    {/* searchRes 변수에 값이 있을 때만 랜더링 / 값이 있을 경우 type이 string일 경우 그대로 표시, object일 경우 key 값(기업 명)과 value값(종목코드)을 각각 표시 */}
                    {searchRes && (
                      typeof searchRes === 'object' ? (
                        <View>
                        {Object.keys(searchRes).map((key) => (
                          <TouchableOpacity style={styles.searchResultBox} key={key} onPress={() => stockSearchChoice(key, searchRes[key])}>
                            <View style={styles.searchResultValue}>
                              <Text>{key}</Text>
                              <Text>{searchRes[key]}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                        </View>
                      ) : (
                        <View>
                          <Text>{searchRes}</Text>
                        </View>
                      )
                    )}
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
  searchModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: '15%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchModalContent: {
    backgroundColor: '#E8F6EF',
    width: '80%',
    height: 140,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'flex-start',
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
  searchInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    backgroundColor: '#ffffff'
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B9C85',
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  searchButton: {
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
  userMessage: {
    backgroundColor: '#1B9C85',
  },
  botMessage: {
    backgroundColor: '#FFE194',
  },
  searchResultBox: {
    backgroundColor: 'white',
    width: 270,
    height: 40,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  searchResultValue: {
    width: '100%',
    fontSize: 20,
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default TopMenuPage;