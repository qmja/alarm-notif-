import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";


const screen = Dimensions.get("window");

const formatNumber = (number) => `0${number}`.slice(-2);

const getRemaining = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = (length) => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};

const AVAILABLE_MINUTES = createArray(11);
const AVAILABLE_SECONDS = createArray(60);

class Timer extends Component {
  state = {
    remainingSeconds: 0,
    isRunning: false,
    selectedMinutes: "0",
    selectedSeconds: "0",
  };

  interval = null;

  componentDidUpdate(prevProps, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start = () => {
    this.setState((state) => ({
      remainingSeconds:
        parseInt(state.selectedMinutes, 10) * 60 +
        parseInt(state.selectedSeconds, 0),
      isRunning: true,
    }));
    this.interval = setInterval(() => {
      this.setState((state) => ({
        remainingSeconds: state.remainingSeconds - 1,
      }));
    }, 1000);
  }

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 0,
      isRunning: false,
    });
  }

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={(itemValue) => {
          this.setState({ selectedMinutes: itemValue });
        }}
        mode="dialog"
      >
        {AVAILABLE_MINUTES.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>min</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedSeconds}
        onValueChange={(itemValue) => {
          this.setState({ selectedSeconds: itemValue });
        }}
        mode="dialog"
      >
        {AVAILABLE_SECONDS.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>sec</Text>
    </View>
  );

  render() {
    const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Timer</Text>
        <View style={styles.timercontainer}>
        {this.state.isRunning ? (
          <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        ) : (
          this.renderPickers()
        )}
        {this.state.isRunning ? (
          <TouchableOpacity
            onPress={this.stop}
            style={[styles.button, styles.buttonStop]}
          >
            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.start} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#485613",
    alignItems: "center",
    justifyContent: "center"
  },
  timercontainer: {
    backgroundColor: "#788f25",
    borderRadius: 20,
    width: 350,
    height: 370,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderWidth: 10,
    borderColor: "#6B4406",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  buttonStop: {
    borderWidth: 10,
    borderColor: "#fff8d6",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  buttonText: {
    fontSize: 45,
    color: "#fff8d6"
  },
  buttonTextStop: {
    color: "#6B4406"
  },
  timerText: {
    color: "#6B4406",
    fontSize: 90
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 100,
  },
  picker: {
    flex: 1,
    backgroundColor: "#6B4406",
    maxWidth: 100,
    ...Platform.select({
      android: {
        color: "#6B4406",
        backgroundColor: "#fff8d6",
      }
    })
  },
  pickerItem: {
    color: "#fff",
    fontSize: 20,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      }
    })
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  }
});

export default Timer;