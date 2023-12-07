import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import Parse from 'parse/react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Password = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState("");
    const [enterNewPassword, setEnterNewPassword] = useState("");
    const user = Parse.User.current();

  const handleCheckPress = () => {


  if (newPassword === enterNewPassword) {
  user.setPassword(newPassword);

  user.save()
    .then(() => {
      Alert.alert('Password was changed successfully.');
      navigation.navigate("Settings");
    })
    .catch((error) => {
      Alert.alert('Error while changing password', error);
    });
} else {
  Alert.alert('Password validation failed.');
}
  };

  const onClose = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <TouchableOpacity style={styles.addAlarmContainer} onPress={onClose}>
          <Icon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addAlarmContainer} onPress={handleCheckPress}>
          <Icon name="check" style={styles.checkIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Password</Text>
      <View style={styles.lineItem}/>
        <View style={styles.passwordAlign}>

      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        placeholderTextColor="#fff8d6"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        />
      <TextInput
        style={styles.input}
        placeholder="Re-Enter your New Password"
        placeholderTextColor="white"
        secureTextEntry={true}
        value={enterNewPassword}
        onChangeText={(text) => setEnterNewPassword(text)}
      />
        </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#485613",
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
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
  lineItem: {
    borderTopWidth: 1,
    borderColor: 'white',
    marginHorizontal: 0,
    paddingVertical: 20,
  },
  closeIcon: {
    fontSize: 30,
    color: "white",
  },
  checkIcon: {
    fontSize: 30,
    color: "white",
    paddingLeft: 320,
  },
  icon: {
    flexDirection: "row",
  },
  items: {
    flexDirection: "row",
    fontSize: 25,
    backgroundColor: "#788f25",
    borderRadius: 50,
    padding: 10,
    paddingBottom: 30,
    paddingTop: 30,
    paddingLeft: 30,
    marginTop: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  arrowIcon: {
    fontSize: 20,
    color: "white",
    paddingLeft: 320,
  },
  passwordAlign:{
    paddingTop: 80,
    marginVertical: 50,
    alignItems: "center",
  },
});
