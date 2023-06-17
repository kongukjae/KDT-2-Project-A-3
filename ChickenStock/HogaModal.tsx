
import React, { useState ,useContext,useEffect} from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View, ModalProps } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import {AuthContext} from './AllContext';



// 모달팝업안의 자식들 타입 지정
interface HogaModalProps extends ModalProps{
  onClose: () => void;
}
 

const HogaModal:React.FC<HogaModalProps> = ({visible, onClose,}) => {
 
  const {userHoga} = useContext(AuthContext); //컨텍스트 사
  const [hogaGap,setHogaGap] = useState<number>(0)//매수 매도 차 저장 용도
  let a = parseInt(userHoga[43])
  let b = parseInt(userHoga[44])

  
  
  //마운트 될 떄 마다 매수 매도 차이 계산 후 hogaGap에 저장 
  useEffect(()=>{
    const newHogaGap= a-b
    setHogaGap(newHogaGap)
  })
  


  return (
      <Modal visible={visible} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}> 
          {/* activeOpacity를 통해 깜빡거리는 문제 해결 */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text>호가 모달</Text>
            <View style ={styles.hogaContainer}>
              <View style={styles.hogaTopContent}>
                <View style={styles.hogaTopText}>
                  <Text>매도잔량</Text>
                </View>
                <View style={styles.hogaTopText}>
                  <Text>{userHoga[1]}</Text>
                </View>
                <View style={styles.hogaTopText}>
                  <Text>매수잔량</Text>
                </View>
              </View>
              <View style={styles.hogaBuyContent}>
                <View style={styles.hogaBuyBox1}>
                  <View style={styles.hogadivide}>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[27]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[26]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[25]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[24]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[23]}</Text>
                    </View>
                  </View>
                  <View style={styles.hogadivide}>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[7]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[6]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[5]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[4]}</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>{userHoga[3]}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.hogaBuyBox2}></View>
              </View>
              <View style={styles.hogaSellContent}>
                <View style={styles.hogaSellBox1}></View>
                <View style={styles.hogaSellBox2}>
                  {/* 매수시간view */}
                  <View style={styles.hogadivide}>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[13]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[14]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[15]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[16]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[17]}</Text>
                    </View>
                  </View>
                  {/* 매수잔량 view */}
                  <View style={styles.hogadivide}> 
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[33]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[34]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[35]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[36]}</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>{userHoga[37]}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.hogaBottomContent}>
                <View style={styles.hogaBottomText}>
                  <Text>{userHoga[43]}</Text>
                </View>
                <View style={styles.hogaBottomText}>
                  <Text>{hogaGap}</Text>
                </View>
                <View style={styles.hogaBottomText}>
                  <Text>{userHoga[44]}</Text>
                </View>
              </View>
            </View>
            

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems:'flex-end'
    // 모달창
  },
  modalContent: {
    width: '80%',
    height: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hogaContainer:{
    flex:1
  },
  hogaTopContent:{
    width:'100%',
    height:'5%',
    backgroundColor:'#FFE194',
    flexDirection:'row'
  },
  hogaBuyContent:{
    width:'100%',
    height:'45%',
    backgroundColor:'#1B9C85',
    flexDirection:'row'
  },
  hogaSellContent:{
    width:'100%',
    height:'45%',
    backgroundColor:'#E8F6EF',
    flexDirection:'row'
  },
  hogaBottomContent:{
    width:'100%',
    height:'5%',
    backgroundColor:'#4C4C6D',
    flexDirection:'row'
  }, 
  hogaTopText:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  hogaBuyBox1:{
    flex:2,
    flexDirection:'row'
  },
  hogaBuyBox2:{
    flex:1,
  },
  hogaSellBox1:{
    flex:1,
  },
  hogaSellBox2:{
    flex:2,
    flexDirection:'row'

  },
  hogaBottomText:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  hogadivide:{
    flex:1,
  },
  hogaContents1:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    borderRightWidth:1,
    borderColor:'black'
  },
  hogaContents2:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    borderLeftWidth:1,
    borderColor:'black'
  }

});

export default HogaModal;

