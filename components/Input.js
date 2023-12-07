import { StyleSheet, View, KeyboardAvoidingView, TextInput } from 'react-native';
import React from 'react';

export default function Input() {
  return (
    <KeyboardAvoidingView style={styles.inputStyle}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Email"  />
      </View>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Username" />
      </View>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 5,
  },
  input: {
    padding: 10,
    paddingRight: 100, 
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: 'white',
    fontWeight: 'bold',
    color: '#b1b3b5',
    width: '100%',
  },
});
