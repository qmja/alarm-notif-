import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function List({ isAlarmOn, onToggleAlarm, time, question }) {
  const handleToggleAlarm = () => {
    onToggleAlarm();
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={[styles.timeText, { color: isAlarmOn ? 'red' : 'white' }]}>
          {time}
        </Text>
        {question && (
          <Text style={[styles.questionText, { color: isAlarmOn ? 'red' : 'white' }]}>
            Question: {question}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={handleToggleAlarm}>
        <View
          style={[
            styles.container,
            isAlarmOn ? styles.alarmOnContainer : styles.alarmOffContainer,
          ]}>
          <View
            style={[
              styles.circular,
              isAlarmOn ? styles.alarmOn : styles.alarmOff,
              isAlarmOn ? styles.slideRight : styles.slideLeft,
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  alarmOnContainer: {
    backgroundColor: '#64CCC5',
  },
  alarmOffContainer: {
    backgroundColor: '#4D4D54',
  },
  circular: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignSelf: 'center',
    position: 'absolute',
  },
  slideLeft: {
    left: 0,
  },
  slideRight: {
    left: 30,
  },
  alarmOn: {
    backgroundColor: '#fff',
  },
  alarmOff: {
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  questionText: {
    fontSize: 6,
    color: 'red',
    marginTop: 5,
  },
  itemLeft: {
    flexDirection: 'column', // Updated to column layout
    alignItems: 'flex-start', // Align items to the start
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#053B50',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

