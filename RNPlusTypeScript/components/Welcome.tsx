import {View, Text, StyleSheet} from 'react-native';

type WelcomeProps = {
  name: string;
  age: number;
  gender: 'Male' | 'Female';
};

function Welcome(props: WelcomeProps) {
  return (
    <View style={styles.container}>
      <Text>Hello {props.name}</Text>
      <Text>You are old, you are {props.age}</Text>
      <Text>You are {props.gender}</Text>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {},
});
