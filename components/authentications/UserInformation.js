import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserInformation = ({ navigation }) => {
  const handleCheckPress = () => {
    Alert.alert('User Information Saved', 'Changes have been saved successfully.');
    navigation.navigate("Settings");
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
      <Text style={styles.title}>User Information</Text>

      <View style={styles.lineItem}/>
      <View>

        <TouchableOpacity>
          <Text style={styles.items}>Email</Text>
        </TouchableOpacity>
      
        </View>
    </View>
  );
};

export default UserInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#485613",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
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
});
