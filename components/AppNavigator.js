import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./authentications/Login";
import SignUp from "./authentications/SignUp";
import Dashboard from "./Dashboard";
import AddQuestion from "./AddQuestion";
import Settings from "./menu/Settings"
import UserInformation from "./authentications/UserInformation";
import Password from "./authentications/Password";
import Ana from "./menu/DataAnalytics"
import LOQ from "./ListOfQuestion"
import AlarmDetailScreen from './AlarmDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer styles={StyleSheet.container}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Dashboard} />
        <Stack.Screen name="AddQuestion" component={AddQuestion} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="UserInformation" component={UserInformation} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Analytics" component={Ana} />
        <Stack.Screen name="List of Questions" component={LOQ} />
        <Stack.Screen name="AlarmDetailScreen" component={AlarmDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#485613',
  },
});