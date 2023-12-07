import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => {
 return (
    <View style={styles.container}>
      <Text style={styles.header}>Sleep Duration</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Mon</Text>
          <Text style={styles.cell}>Tue</Text>
          <Text style={styles.cell}>Wed</Text>
          <Text style={styles.cell}>Thu</Text>
          <Text style={styles.cell}>Fri</Text>
          <Text style={styles.cell}>Sat</Text>
          <Text style={styles.cell}>Sun</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>6h</Text>
          <Text style={styles.cell}>4h</Text>
          <Text style={styles.cell}>2h</Text>
          <Text style={styles.cell}>Oh</Text>
          {/* ... more cells */}
        </View>
      </View>
      <Text style={styles.header}>Analytics Response Duration</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>10s</Text>
          <Text style={styles.cell}>85s</Text>
          <Text style={styles.cell}>6s</Text>
          <Text style={styles.cell}>4s</Text>
          <Text style={styles.cell}>2s</Text>
          <Text style={styles.cell}>01s</Text>
          <Text style={styles.cell}>02s</Text>
          <Text style={styles.cell}>03s</Text>
          <Text style={styles.cell}>04s</Text>
        </View>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 10,
 },
 header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
 },
 table: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
 },
 row: {
    flexDirection: 'row',
 },
 cell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    width: '14.28%', // To make cells take equal width
 },
});

export default App;