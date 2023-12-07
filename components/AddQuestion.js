// AddQuestion.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Parse from 'parse/react-native';

const AddQuestion = ({ navigation }) => {
  const [question, setQuestionText] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

const handleAddQuestion = async () => {
  const currentUser = Parse.User.current();

  if (currentUser) {
    const Question = Parse.Object.extend('Question');
    const newQuestion = new Question();
    
    // Set the current user as a pointer in the 'user' column of the 'Question' class
    newQuestion.set('user', currentUser);

    newQuestion.set('question', question);
    newQuestion.set('correctAnswer', correctAnswer);

    try {
      await newQuestion.save();
      navigation.navigate("Welcome"); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error adding question:', error);
    }
  } else {
    console.error('No current user. Please make sure the user is logged in.');
    // You might want to handle this case in your application
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Question</Text>
      <TextInput
        style={styles.input}
        placeholder="Question"
        value={question}
        onChangeText={(text) => setQuestionText(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correct Answer"
        value={correctAnswer}
        onChangeText={(text) => setCorrectAnswer(text)}
      />
      <Button title="Add Question" onPress={handleAddQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AddQuestion;
