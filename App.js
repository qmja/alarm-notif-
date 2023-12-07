import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './components/AppNavigator';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('QAj0txTZ3QsXPvtGniQeEfn58Lcf5C2oPy59R5up', 'Vvw3YngB7M7xICdyaa2hlEQ8p4jAxObt6cbZngjc');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function App() {
  return (
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#176B87',
  },
  topSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


