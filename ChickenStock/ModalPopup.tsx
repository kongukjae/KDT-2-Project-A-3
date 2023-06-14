

// import React, { useState } from 'react';
// import { Button, Modal, Text, View } from 'react-native';

// const ModalPopup = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View>
//       <Button title="Open Modal" onPress={openModal} />
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Hello, Modal!</Text>
//           <Button title="Close" onPress={closeModal} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ModalPopup;
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View, ModalProps } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';


interface ModalPopupProps extends ModalProps{
  onClose: () => void;
}


const ModalPopup:React.FC<ModalPopupProps> = ({visible, onClose}) => {
  
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
                  <Text>시간</Text>
                </View>
                <View style={styles.hogaTopText}>
                  <Text>매수잔량</Text>
                </View>
              </View>
              <View style={styles.hogaBuyContent}>
                <View style={styles.hogaBuyBox1}>
                  <View style={styles.hogadivide}>
                    <View style={styles.hogaContents1}>
                      <Text>매수잔량1</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수잔량2</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수잔량3</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수잔량4</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수잔량5</Text>
                    </View>
                  </View>
                  <View style={styles.hogadivide}>
                    <View style={styles.hogaContents1}>
                      <Text>매수시간1</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수시간2</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수시간3</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수시간4</Text>
                    </View>
                    <View style={styles.hogaContents1}>
                      <Text>매수시간5</Text>
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
                      <Text>매수시간1</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수시간2</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수시간3</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수시간4</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수시간5</Text>
                    </View>
                  </View>
                  {/* 매수잔량 view */}
                  <View style={styles.hogadivide}> 
                    <View style={styles.hogaContents2}>
                      <Text>매수잔량1</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수잔량2</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수잔량3</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수잔량4</Text>
                    </View>
                    <View style={styles.hogaContents2}>
                      <Text>매수잔량5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.hogaBottomContent}>
                <View style={styles.hogaBottomText}>
                  <Text>1,704,940</Text>
                </View>
                <View style={styles.hogaBottomText}>
                  <Text>-197,713</Text>
                </View>
                <View style={styles.hogaBottomText}>
                  <Text>1,507,227</Text>
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

export default ModalPopup;

