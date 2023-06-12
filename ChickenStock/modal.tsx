import React, { useState } from 'react';
import { View, Modal, Button, StyleSheet } from 'react-native';

const MyModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.rowContainer}>
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.column} />
              <View style={styles.column} />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.column} />
              <View style={styles.column} />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
              <View style={styles.column} />
            </View>
          </View>
        </View>
      </Modal>
      
      {!modalVisible && (
        <Button
          title="Toggle Modal"
          onPress={() => setModalVisible(true)}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    position: 'absolute',
    top: 0,
  },
});

export default MyModal;
