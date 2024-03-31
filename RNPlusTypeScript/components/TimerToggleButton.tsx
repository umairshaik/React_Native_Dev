import React from 'react';
import {Button, Pressable, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    <Pressable>
      <View>
        <Button
          title={isTimerRunning ? 'Stop Timer' : 'Start Timer'}
          onPress={isTimerRunning ? stopTimer : startTimer}
        />
      </View>
    </Pressable>
  );
};

export default TimerToggleButton;
