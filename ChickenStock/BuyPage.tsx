import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import HogaModal from './HogaModal';
import {AuthContext} from './AllContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFE194',
    gap: 20,
  },
  textBox: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  textBtn: {
    backgroundColor: '#E8F6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 100,
    height: 50,
  },
  text: {
    fontSize: 20,
  },
  calculateBox: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
  calculateText: {
    fontSize: 20,
    color: 'black',
  },
  title: {
    fontFamily: 'BagelFatOne-Regular',
    color: 'black',
    fontSize: 40,
  },
  keyPadContainer: {
    flex: 0.78,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  keyPadBox: {
    flexDirection: 'row',
    gap: 10,
  },
  keyPad: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#1B9C85',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPadText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnBox: {
    backgroundColor: '#E8F6EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: 200,
    height: 50,
  },
  btnText: {
    color: '#1B9C85',
    fontSize: 25,
  },
  inputContainer: {
    width: 100,
    height: 35,
    borderWidth: 3,
    borderColor: '#1B9C85',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
  },
});

const BuyPage = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState('');
  const [selectedInput, setSelectedInput] = useState<number>(0);
  const [modal, setModal] = useState(false);
  const {companyName, companyPrice} = useContext(AuthContext);

  const openModal = () => {
    setModal(true);
    setInterval(() => {
      fetch('http://10.0.2.2:5000/api/hoga')
        .then(res => res.json())
        .then(data => setUserHoga(data))
        .catch(error => console.log(error));
    }, 1000);
  };
  const closeModal = () => {
    setModal(false);
  };

  const totalPrice = quantity * companyPrice;
  // quantity !== '' && price !== '' ? parseInt(quantity) * parseInt(price) : '';
  //! 수량과 가격이 ''이 아닐경우에 두 값을 곱하고 아닐경우에는 ''을 붙인다.

  const handleNumberPress = (number: number) => {
    if (selectedInput === quantity) {
      if (quantity === 0) {
        setQuantity(number);
      } else {
        const updatedQuantity = parseInt(
          quantity.toString() + number.toString(),
          10,
        );
        setQuantity(updatedQuantity);
      }
    }
  };

  const handleDeletePress = (number: number) => {
    if (selectedInput === quantity) {
      setQuantity(0);
    }
  };
  type RootStackParamList = {
    ModalPopup: undefined;
    MainPage: undefined;
    BuyPage: undefined;
  };
  type loginPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    'BuyPage'
  >;
  const navigation = useNavigation<loginPageNavigationProp>();

  const handlePurchase = () => {
    console.log('주식 구매:', totalPrice);
    // Flask 서버로 totalPrice 전송하는 코드 작성
    fetch('http://10.0.2.2:5000/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({totalPrice, companyName, quantity}),
    })
      .then(response => {
        if (response.ok) {
          navigation.navigate('MainPage');
        } else {
          throw new Error('구매 요청 실패');
        }
      })
      .then(data => {
        // 응답 데이터 처리
        console.log('구매 응답:', data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputSelection = (inputType: number) => {
    setSelectedInput(inputType);
  };

  // const [data, setData] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>구매하기</Text>
        <TouchableOpacity style={styles.textBtn}>
          <Text style={styles.btnText} onPress={openModal}>
            호가
          </Text>
          <HogaModal visible={modal} onClose={closeModal}></HogaModal>
        </TouchableOpacity>
      </View>
      <View style={styles.calculateBox}>
        <View>
          <Text style={styles.calculateText}>{companyName}</Text>
        </View>
        <View>
          <Text style={styles.calculateText}>{totalPrice} 원</Text>
          {/* //! toLocaleString 1000 단위로 , 표시해줌 */}
        </View>
      </View>
      <View style={styles.calculateBox}>
        <View style={styles.calculateBox}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => handleInputSelection(quantity)}>
            <Text style={styles.input}>{quantity}</Text>
          </TouchableOpacity>
          <Text>주</Text>
        </View>
        {/* <View style={styles.calculateBox}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => handleInputSelection()}>
            <Text style={styles.input}>{price}</Text>
          </TouchableOpacity>
          <Text>원</Text>
        </View> */}
      </View>
      <View style={styles.keyPadContainer}>
        <View style={styles.keyPadBox}>
          <TouchableOpacity
            onPress={() => handleNumberPress(1)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(2)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(3)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyPadBox}>
          <TouchableOpacity
            onPress={() => handleNumberPress(4)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(5)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(6)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyPadBox}>
          <TouchableOpacity
            onPress={() => handleNumberPress(7)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(8)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(9)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyPadBox}>
          <TouchableOpacity style={styles.keyPad}>
            <Text style={styles.keyPadText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress(0)}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeletePress}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnBox} onPress={handlePurchase}>
          <Text style={styles.btnText}>구매하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuyPage;

function setUserHoga(data: any): any {
  throw new Error('Function not implemented.');
}
