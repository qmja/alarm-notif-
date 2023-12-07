import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, Text, View, Switch, ScrollView, Pressable, Alert, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertMessage from "./alert/AlertMessage";
import Parse from 'parse/react-native';
import AlarmDetailScreen from './AlarmDetailScreen'; // Import the new component
import * as Notifications from 'expo-notifications'

export default function Welcome({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const automaticPadding = screenWidth * 0.35; // Adjust the percentage as needed
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [alarms, setAlarms] = useState([]);
  const [isAlarmOn, setIsAlarmOn] = useState(false);  
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimePicker = () => setTimePickerVisible(true);

  const hideTimePicker = () => setTimePickerVisible(false);

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    addAlarm(time);
    scheduleNotification(time);
    hideTimePicker();
  };

  const handleNotification = (response) => {
    console.log('Notification received:', response);
    if (response.actionIdentifier === 'STOP_ACTION') {
      // Handle stopping the alarm or any other action
      console.log('User pressed Stop button!');
      // Add your logic for stopping the alarm here
    }
  };

  const scheduleNotification = async (alarmTime) => {
    const notificationTime = new Date(alarmTime);
    // Schedule the notification 1 minute before the alarm time (adjust as needed)
    notificationTime.setMinutes(notificationTime.getMinutes() - 1);
  
    // Format the time for display in the notification body
    const formattedTime = notificationTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
    // Get the sound file URI
    const soundFileUri = require('../assets/defaultSound.mp3');
  
    try {
      // Schedule the notification with the specified sound
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alarm',
          body: `It's time for your alarm! Set for ${alarmTime}`,
          sound: soundFileUri,
          has_button: true,
          vibrate: true,
          schedule_type: 'once',
          loop_sound: true,
          actions: [
            {
              actionId: 'STOP_ACTION',
              text: 'Stop',
            },
          ],
        },
        trigger: {
          date: new Date(alarmTime),
        },
        channelId: 'default',

      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const openAlarmDetailScreen = (alarm) => {
    navigation.navigate('AlarmDetailScreen', { selectedAlarm: alarm });
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync({ projectId: 'd711e7b6-1a89-4c5e-a4a1-76dc5e02902e' })).data;
      console.log(token); // This will log the device token
    } catch (error) {
      console.error('Error requesting push notification permissions:', error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    const query = new Parse.Query("Alarm");
    query.equalTo("userId", Parse.User.current()); // Link the alarms to the current user
    query.find().then(results => {
      // If successful, update the alarms state with the fetched data
      const loadedAlarms = results.map(alarm => ({
        id: alarm.id,
        time: alarm.get("time").toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOn: alarm.get("isOn"),
      }));
      setAlarms(loadedAlarms);
    }).catch(error => {
      console.error('Error fetching alarms', error);
    });

    // Set up notification handler
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);

    // Clean up the subscription when component unmounts
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // Function to add alarm to Backend
  const addAlarmToBackend = (time, isOn, questionId) => {
    if (time) {
      const Alarm = new Parse.Object("Alarm");
      Alarm.set("userId", Parse.User.current());
      Alarm.set("time", time);
      Alarm.set("isOn", isOn);
     
      // Check if questionId is provided and is a valid string
      if (questionId && typeof questionId === 'string') {
        // Set the question property using the provided questionId
        Alarm.set("question", Parse.Object.createWithoutData('Question', questionId));
      }
 
      Alarm.save().then(alarm => {
        // If successful, update state with the new alarm
        setAlarms([...alarms, {
          id: alarm.id,
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOn: isOn,
          question: questionId, // Update this based on how you want to store the question information
        }]);
      }).catch(error => {
        console.error('Error saving alarm', error);
      });
    }
  };

  // Add alarm when a time is picked in DateTimePicker
  const addAlarm = (time) => {
    const isAlarmOn = true; // by default when adding an alarm, we can set it to be ON
    addAlarmToBackend(time, isAlarmOn);
  };

    // Function to delete alarm from Backend
    const deleteAlarmFromBackend = async (alarmId) => {
      try {
        const Alarm = new Parse.Object("Alarm");
        Alarm.set("objectId", alarmId);
        await Alarm.destroy();
        Alert.alert('Success', 'Alarm has been deleted.');
      } catch (error) {
        console.error('Error deleting alarm', error);
        Alert.alert('Error', 'Failed to delete alarm.');
      }
    };
 
    // Delete alarm when user confirms deletion
    const confirmDeleteAlarm = (alarmId) => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this alarm?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              // Remove the alarm from state and call the delete function
              const updatedAlarms = alarms.filter(alarm => alarm.id !== alarmId);
              setAlarms(updatedAlarms);
              deleteAlarmFromBackend(alarmId);
            },
          },
        ],
        { cancelable: false },
      );
    };

  const toggleAlarm = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].isOn = !updatedAlarms[index].isOn;
    setAlarms(updatedAlarms);
  };

  const [modal1Visible, setModal1Visible] = useState(false);

  const closeModal = () => {
    setModal1Visible(false);
  };

  const handleCancel = () => {
    console.log('Canceled...');
  };

  const onPressButton = () => {
    AlertMessage(handleContinue, handleCancel);
  };

  return (
    <View style={styles.container}>
      <Modal // modal 1: for settings and view analytics
        animationType="none"
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => {
          setModal1Visible(!modal1Visible);
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.textStyle}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button1]}
                onPress={() => navigation.navigate("Analytics")}>
                <Text style={styles.textStyle}>View Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    
      <View style={styles.option} // menu -------------------------------------
      >
        <TouchableOpacity onPress={() => setModal1Visible(!modal1Visible)}>
          <Icon name="menu" style={[styles.menuIcon, { paddingLeft: automaticPadding }]} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Alarm</Text>
      <ScrollView style={styles.alarmsContainer}>
        {alarms.map((alarm, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => openAlarmDetailScreen(alarm)} // Use the updated function
          onLongPress={() => confirmDeleteAlarm(alarm.id)}
        >
          <View style={styles.alarmItem}>
            <Text style={styles.alarmTime}>{alarm.time}</Text>
            <Switch value={alarm.isOn} onValueChange={() => toggleAlarm(index)} />
          </View>
        </TouchableOpacity>
        ))}
      </ScrollView>

      <Pressable style={styles.addAlarmContainer} onPress={showTimePicker}>
        <Icon name="add" style={styles.addIcon} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#485613",
    padding: 20,
  },
  view:{
    flexDirection: 'row',
    paddingLeft: 120,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  alarmsContainer: {
    flex: 1,
    backgroundColor: '#788F25',
    borderRadius: 20
  },

  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b07c3b",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginVertical: 5,
    marginHorizontal: 10
  },

  alarmTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
  },
  addAlarmContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#b07c3b"
  },

  addIcon: {
    fontSize: 30,
    color: "black",
  },

  centeredView: {
    flex: 1,
    paddingLeft: 85,
        paddingTop:  80,
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    justifyContent: "space-between",
    borderRadius: 20,
    padding:15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    paddingLeft: 10,
    borderColor: '#fff8d6',
    borderRadius: 15,
    paddingRight: 160,
    borderWidth:2,
    marginTop: 5,
  },
  button1: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: '#fff8d6',
    borderRadius: 15,
    borderWidth:2,
    paddingLeft: 10,
    paddingRight: 120,
    marginTop: 5,
  },
  buttonOpen: {
    color: '#fff8d6',
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    color: '#fff8d6',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  option: {
    paddingLeft: 150,
    flexDirection: "row",
  },
  optionStyle: {
    paddingLeft: 120,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  menuIcon: {
    fontSize: 40,
    color: "white",
 
  },

});
