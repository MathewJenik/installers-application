import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

interface AlertProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

/**
 * 
 * @param {boolean} isVisible
 * @param {string} title
 * @param {string} message
 * @param {void} onClose
 * @returns Modal (Modal alert view)
 */
const customAlert: React.FC<AlertProps> = ({ isVisible, title, message, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <Modal isVisible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{title}</Text>
            <Text>{message}</Text>
          </View>
        </View>
        
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 15,
  },
});

export default customAlert;
