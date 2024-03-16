import { useState } from "react";
import { TextInput, View, Button, StyleSheet } from "react-native";

function GoalInput(props) {
  const [inputText, setInputText] = useState("");

  function goalInputHandler(value) {
    console.log(value);
    setInputText(value);
  }

  function addGoalHandler() {
    props.onAddGoal(inputText);
    setInputText("");
  }

  return (
    <View style={styles.inputContatiner}>
      <TextInput
        placeholder="Your course goal"
        style={styles.testInputStyle}
        onChangeText={goalInputHandler}
        value={inputText}
      />
      <Button title="Add Goal" onPress={addGoalHandler} />
    </View>
  );
}
export default GoalInput;

const styles = StyleSheet.create({
  testInputStyle: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  inputContatiner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
