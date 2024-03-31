import React from 'react';
import {Button, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type TimerProps = {
  isTimerRunning: boolean;
  stopTimer: () => void;
  startTimer: () => void;
};

const TimerToggleButton: React.FC<TimerProps> = ({
  isTimerRunning,
  stopTimer,
  startTimer,
}) => {
  return (
    <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
      <View style={styles.container}>
        <Icon
          name={isTimerRunning ? 'heart' : 'heart'}
          size={125}
          style={styles.icon}
        />
        {/* <Button
          title={isTimerRunning ? 'Stop Timer' : 'Start Timer'}
          onPress={isTimerRunning ? stopTimer : startTimer}
        /> */}
      </View>
    </Pressable>
  );
};

export default TimerToggleButton;

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    color: '#ffffff',
  },
  container: {
    borderWidth: 5,
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    justifyContent: 'center',
    borderColor: '#ffffff',
    marginVertical: 50,
  },
});
