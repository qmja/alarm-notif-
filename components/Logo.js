import { StyleSheet, Image, View } from 'react-native';
import React from 'react';

export default function Logo() {
  return (
    <View style={styles.StyleOut}>
      <Image source={require('../assets/logologo.png')} style={styles.Logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  Logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain', 
  },
  StyleOut: {
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
