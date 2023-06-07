import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

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
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [selectedInput, setSelectedInput] = useState('');

  const totalPrice =
    quantity !== '' && price !== '' ? parseInt(quantity) * parseInt(price) : '';

  const handleNumberPress = (number: string) => {
    if (selectedInput === 'quantity') {
      if (quantity === '0') {
        setQuantity(number);
      } else {
        setQuantity(quantity + number);
      }
    } else if (selectedInput === 'price') {
      if (price === '0') {
        setPrice(number);
      } else {
        setPrice(price + number);
      }
    }
  };

  const handleDeletePress = () => {
    if (selectedInput === 'quantity') {
      setQuantity(quantity.slice(0, -1));
    } else if (selectedInput === 'price') {
      setPrice(price.slice(0, -1));
    }
  };

  const handlePurchase = () => {
    console.log('주식 구매:', quantity);
  };

  const handleInputSelection = (inputType: string) => {
    setSelectedInput(inputType);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>구매하기</Text>
        <TouchableOpacity style={styles.textBtn}>
          <Text style={styles.btnText}>호가</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calculateBox}>
        <View>
          <Text style={styles.calculateText}>카카오뱅크</Text>
        </View>
        <View>
          <Text style={styles.calculateText}>
            {totalPrice !== '' ? totalPrice.toLocaleString() : ''} 원
          </Text>{' '}
          //! toLocaleString 1000 단위로 , 표시해줌
        </View>
      </View>
      <View style={styles.calculateBox}>
        <View style={styles.calculateBox}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => handleInputSelection('quantity')}>
            <Text style={styles.input}>{quantity}</Text>
          </TouchableOpacity>
          <Text>주</Text>
        </View>
        <View style={styles.calculateBox}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => handleInputSelection('price')}>
            <Text style={styles.input}>{price}</Text>
          </TouchableOpacity>
          <Text>원</Text>
        </View>
      </View>
      <View style={styles.keyPadContainer}>
        <View style={styles.keyPadBox}>
          <TouchableOpacity
            onPress={() => handleNumberPress('1')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('2')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('3')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyPadBox}>
          <TouchableOpacity
            onPress={() => handleNumberPress('4')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('5')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('6')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyPadBox}>
          <TouchableOpacity
            onPress={() => handleNumberPress('7')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('8')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('9')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyPadBox}>
          <TouchableOpacity style={styles.keyPad}>
            <Text style={styles.keyPadText}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNumberPress('0')}
            style={styles.keyPad}>
            <Text style={styles.keyPadText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeletePress} style={styles.keyPad}>
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
