

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
            <Text>Hello, Modal1!</Text>
            <Text>Hello, Modal2!</Text>
            <Text>Hello, Modal3!</Text>
            <Text>Hello, Modal4!</Text>

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
    height: '80%',
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
});

export default ModalPopup;

