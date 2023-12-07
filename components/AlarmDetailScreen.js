import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Parse from 'parse/react-native';

const AlarmDetailScreen = ({ route, navigation }) => {
  const { selectedAlarm } = route.params;
  const [assignedQuestions, setAssignedQuestions] = useState([]);

  useEffect(() => {
    console.log('Selected Alarm Details:', selectedAlarm);
    fetchAssignedQuestions();
  }, []);

  const fetchAssignedQuestions = async () => {
    try {
      const Question = Parse.Object.extend('Question');
      const query = new Parse.Query(Question);
  
      // Assuming you have a 'question' array of pointers in the Alarm class pointing to the Question class
      const alarm = Parse.Object.extend('Alarm');
      const alarmObject = new alarm();
      alarmObject.id = selectedAlarm.id;
  
      // Get the array of pointers
      const questionPointers = alarmObject.get('question') || [];
  
      // Fetch the associated questions
      const fetchedQuestions = await Parse.Object.fetchAllIfNeeded(questionPointers);
  
      console.log('Fetched Questions:', fetchedQuestions);
      setAssignedQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching assigned questions:', error);
    }
  };  

  return (
    <View style={styles.container}>
    {selectedAlarm && (
      <View style={styles.alarmDetailContainer}>
        <Text style={styles.alarmTime}>{selectedAlarm.time}</Text>
      </View>
    )}
    {assignedQuestions.map((question) => (
      <View key={question.id} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.get('question')}</Text>
        <Text style={styles.correctAnswerText}>
          Correct Answer: {question.get('correctAnswer')}
        </Text>
      </View>
    ))}
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddQuestion')}>
      <Text style={styles.buttonText}>Add a Question</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('List of Questions', { alarmId: selectedAlarm.id })}
    >
      <Text style={styles.buttonText}>Select a Question</Text>
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#485613',
    padding: 20,
  },
  alarmDetailContainer: {
    backgroundColor: '#b07c3b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  alarmTime: {
    fontSize: 24,
    color: 'white',
  },
  questionContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#b07c3b',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default AlarmDetailScreen;
