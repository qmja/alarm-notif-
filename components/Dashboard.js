//Dashboard - old_name
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./Welcome"; 
import Timer from "./alarms-timer-stopwatch/TimerScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stopwatch from "./alarms-timer-stopwatch/Stopwatch";
const Tab = createBottomTabNavigator();

export default function Welcome1() {
  return ( 
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: { display: 'flex', backgroundColor: "#788f25" },
      }}
    >
      <Tab.Screen
        name="   "
        component={Welcome}
        options={{
          tabBarLabel: "Alarm",
          tabBarIcon: ({ color, size }) => (
            <Icon name="alarm" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="  "
        component={Timer}
        options={{
          tabBarLabel: "Timer",
          tabBarIcon: ({ color, size }) => (
            <Icon name="timer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name=" " 
        component={Stopwatch}
        options={{
          tabBarLabel: "Stopwatch",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 500,
  },
});