import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Parse from 'parse/react-native';

const Settings = ({ navigation }) => {
  const handleCheckPress = () => {
    Alert.alert('Settings Saved', 'Changes have been saved successfully.');
    navigation.navigate("Welcome");
  };

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      Alert.alert('Logout', 'You have been logged out successfully.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Error logging out: ' + error.message);
    }
  };

  const onClose = () => {
    navigation.navigate("Welcome");
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
      <Text style={styles.title}>Settings</Text>

      <View style={styles.lineItem} />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("UserInformation")}>
          <Text style={styles.items}>User Information</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Password")}>
          <Text style={styles.items}>Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RingTone")}>
          <Text style={styles.items}>Ring Tone</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutItem}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Settings;

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
  lineItem: {
    borderTopWidth: 2,
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
    paddingLeft: 300,
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
    color: 'white',
    paddingTop: 30,
    marginTop: 20,
    paddingLeft: 30,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#788f25",
    borderRadius: 50,
    color: 'white',
    paddingLeft: 130,
    paddingBottom: 30,
    paddingTop: 30,
    padding: 10,
    marginTop: 20,
    fontSize: 25,
    marginHorizontal: 10,
  },
  logout: {
    paddingTop: 120,
  },
  tect: {
    fontSize: 25,
  },
  arrowIcon: {
    fontSize: 20,
    color: "white",
    paddingLeft: 320,
  },
});
