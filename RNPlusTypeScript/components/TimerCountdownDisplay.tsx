import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Prop = {
  timerDate: Date;
};

const TimerCountdownDisplay: React.FC<Prop> = ({timerDate}) => {
  return (
    <View>
      <Text style={styles.timerCountDownText}>
        {timerDate.getMinutes().toString().padStart(2, '0')}:
        {timerDate.getSeconds().toString().padStart(2, '0')}
      </Text>
    </View>
  );
};
export default TimerCountdownDisplay;

const styles = StyleSheet.create({
  timerCountDownText: {
    fontSize: 30,
    fontWeight: '700',
  },
});
