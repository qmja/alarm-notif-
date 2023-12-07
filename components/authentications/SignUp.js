import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import Parse from 'parse/react-native';
import Logo from "../Logo";

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    try {
      if (password === confirmPassword && username && email) {
        const user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);

        await user.signUp();

        Alert.alert('Registration successful!', 'You can now log in with your new account.');
        navigation.navigate("Login");
      } else {
        Alert.alert('Registration failed', 'Please fill in all the fields and make sure passwords match.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Error', `Error registering: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Already have an account? Log in here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: '#485613',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#b07c3b",
    backgroundColor: "#b07c3b",
    color: "#fff8d6",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 5,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#b07c3b",
    textAlign: "center",
  },
  loginLink: {
    color: "#fff8d6",
    fontSize: 16,
    paddingTop: 10,
  },
  logostyle: {
    flex: 1,
  },
});
