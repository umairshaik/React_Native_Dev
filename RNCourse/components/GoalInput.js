import { useState } from "react";
import { TextInput, View, Button, StyleSheet, Modal } from "react-native";

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
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContatiner}>
        <TextInput
          placeholder="Your course goal"
          style={styles.testInputStyle}
          onChangeText={goalInputHandler}
          value={inputText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GoalInput;

const styles = StyleSheet.create({
  testInputStyle: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 8,
  },
  inputContatiner: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "30%",
    marginHorizontal: 8,
  },
});
