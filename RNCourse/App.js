import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  return (
    <View style={styles.appContatiner}>
      <View style={styles.inputContatiner}>
        <TextInput
          placeholder="Your course goal"
          style={styles.testInputStyle}
        />
        <Button title="Add Goal" />
      </View>
      <View>
        <Text>List of Goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContatiner: {
    padding: 40,
  },
  inputContatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  testInputStyle: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
});
