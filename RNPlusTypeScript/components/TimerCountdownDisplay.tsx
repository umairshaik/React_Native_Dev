import {Text, View} from 'react-native';

type Prop = {
  timerDate: Date;
};

const TimerCountdownDisplay = (prop: Prop) => {
  return (
    <View>
      <Text>
        {prop.timerDate.getMinutes().toString().padStart(2, '0')}:
        {prop.timerDate.getSeconds().toString().padStart(2, '0')}
      </Text>
    </View>
  );
};
export default TimerCountdownDisplay;
