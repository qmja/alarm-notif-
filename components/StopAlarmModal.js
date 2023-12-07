import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';

const StopAlarmModal = ({ visible, question, onClose, onStop }) => {
  const [answer, setAnswer] = useState('');

  const handleStop = () => {
    // Implement logic to check the answer and stop the alarm
    // For now, it simply checks if the answer is not empty
    if (answer.trim() !== '') {
      // Call the onStop callback to stop the alarm
      onStop();
    } else {
      // Show an alert or handle invalid answer
      alert('Please enter a valid answer to stop the alarm.');
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Stop Alarm</Text>
          <Text style={styles.modalQuestion}>{question}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            value={answer}
            onChangeText={(text) => setAnswer(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Stop" onPress={handleStop} />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalQuestion: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StopAlarmModal;