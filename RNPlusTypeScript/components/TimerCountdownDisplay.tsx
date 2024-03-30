import React from 'react';
import {Text, View} from 'react-native';

type Prop = {
  timerDate: Date;
};

const TimerCountdownDisplay: React.FC<Prop> = ({timerDate}) => {
  return (
    <View>
      <Text>
        {timerDate.getMinutes().toString().padStart(2, '0')}:
        {timerDate.getSeconds().toString().padStart(2, '0')}
      </Text>
    </View>
  );
};
export default TimerCountdownDisplay;
