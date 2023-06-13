

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
                <View></View>
                <View></View>
                <View></View>
              </View>
              <View style={styles.hogaBuyContent}></View>
              <View style={styles.hogaSellContent}></View>
              <View style={styles.hogaBottomContent}></View>
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
    height:'10%',
    backgroundColor:'#FFE194'
  },
  hogaBuyContent:{
    width:'100%',
    height:'40%',
    backgroundColor:'#1B9C85'
  },
  hogaSellContent:{
    width:'100%',
    height:'40%',
    backgroundColor:'#E8F6EF'
  },
  hogaBottomContent:{
    width:'100%',
    height:'10%',
    backgroundColor:'#4C4C6D'
  } 
  


});

export default ModalPopup;

