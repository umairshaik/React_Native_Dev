import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [courseGoals, setCouserGoals] = useState([]);
  function goalInputHandler(value) {
    console.log(value);
    setInputText(value);
  }
  function addGoalHandler() {
    console.log("on click: " + inputText);
    setCouserGoals((currentCourseGoal) => [...currentCourseGoal, inputText]);
    // setCouserGoals([...courseGoals, inputText]); //one way of doing but not good for state
  }
  return (
    <View style={styles.appContatiner}>
      <View style={styles.inputContatiner}>
        <TextInput
          placeholder="Your course goal"
          style={styles.testInputStyle}
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        <ScrollView>
          <Text>List of Goals...</Text>
          {courseGoals.map((goal) => (
            <View style={styles.goalItem} key={goal}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContatiner: {
    padding: 40,
    flex: 1,
    paddingHorizontal: 16,
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
  testInputStyle: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "white",
  },
});
