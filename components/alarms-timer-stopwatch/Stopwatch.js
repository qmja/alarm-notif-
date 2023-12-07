import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        setElapsedTime(now - startTime);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setStartTime(null);
    } else {
      setIsRunning(true);
      setStartTime(new Date().getTime() - elapsedTime);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Ensure double-digit format with leading zeros
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch</Text>
      <Text style={styles.timer}>{formatTime(elapsedTime / 1000)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startStop}>
          <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#485613",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  timer: {
    color: '#fff8d6',
    fontSize: 100,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6B4406',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default Stopwatch;