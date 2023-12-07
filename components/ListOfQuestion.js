import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Parse from 'parse/react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ListOfQuestion = () => {
  const [question, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { alarmId } = route.params; // Extract the alarmId from the route parameters

  useEffect(() => {
    console.log('Alarm ID:', alarmId); // Log the alarmId to verify it's correct
    fetchQuestions();
  }, [alarmId]);

  // Function to toggle the selection of a question
  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions((prevSelected) => {
      if (prevSelected.includes(questionId)) {
        // Remove the questionId if already selected
        return prevSelected.filter((id) => id !== questionId);
      } else {
        // Add the questionId if not selected
        return [...prevSelected, questionId];
      }
    });
  };

  // Define the function to fetch questions
  const fetchQuestions = async () => {
    try {
      const user = Parse.User.current();
  
      if (!user) {
        console.warn('No current user. Please make sure the user is logged in.');
        return;
      }
  
      const Question = Parse.Object.extend('Question');
      const query = new Parse.Query(Question);
  
      // Add a condition to filter questions based on the user who created them
      query.equalTo('user', user);
  
      const fetchedQuestions = await query.find();
  
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Function to save selected questions to the current alarm
  const saveSelectedQuestions = async () => {
    try {
      const confirmed = await showConfirmationDialog();

      if (confirmed) {
        const user = Parse.User.current();
        const Alarm = Parse.Object.extend('Alarm');
        const alarmQuery = new Parse.Query(Alarm);
        alarmQuery.equalTo('userId', user);
        alarmQuery.equalTo('objectId', alarmId); // Add a condition to find the specific alarm

        const selectedQuestionObjects = selectedQuestions.map((questionId) => {
          const Question = Parse.Object.extend('Question');
          const question = new Question();
          question.id = questionId;
          return question;
        });

        const alarms = await alarmQuery.find();
        if (alarms.length > 0) {
          // Assuming you have a pointer field named 'question' in the Alarm class
          alarms[0].set('question', selectedQuestionObjects);
          await alarms[0].save();
          console.log('Selected questions saved to the current alarm.');

          Alert.alert(
            'Success',
            'Selected questions have been saved successfully.',
            [{ text: 'OK', onPress: () => navigation.navigate('Welcome') }]
          );
        } else {
          console.warn('No alarm found for the current user.');
        }
      } else {
        console.log('User canceled the operation.');
      }
    } catch (error) {
      console.error('Error saving selected questions:', error);
    }
  };

  // Function to show confirmation dialog
  const showConfirmationDialog = async () => {
    return new Promise((resolve) => {
      Alert.alert(
        'Confirmation',
        'Do you want to add these questions?',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  // Call the fetchQuestions function when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <View style={styles.container}>
      {question.map((question) => (
        <TouchableOpacity
          key={question.id}
          style={[
            styles.questionContainer,
            selectedQuestions.includes(question.id) && styles.selectedQuestionContainer,
          ]}
          onPress={() => toggleQuestionSelection(question.id)}>
          <Text style={styles.questionText}>{question.get('question')}</Text>
        </TouchableOpacity>
      ))}
      {selectedQuestions.length > 0 && (
        <TouchableOpacity style={styles.saveButton} onPress={saveSelectedQuestions}>
          <Icon name="check" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 12,
    backgroundColor: '#ECECEC',
    padding: 8,
    borderRadius: 8,
  },
  selectedQuestionContainer: {
    backgroundColor: '#B07C3B',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#B07C3B',
    padding: 12,
    borderRadius: 50,
  },
});

export default ListOfQuestion;
