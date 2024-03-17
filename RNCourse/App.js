import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCouserGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function addGoalHandler(inputText) {
    console.log("on click: " + inputText);
    setCouserGoals((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: inputText, id: Math.random().toString },
    ]);
    // setCouserGoals([...courseGoals, inputText]); //one way of doing but not good for state
  }

  function deleteGoalHandler(id) {
    console.log("Delete");
    setCouserGoals((currentCourseGoal) => {
      return currentCourseGoal.filter((courseGoal) => {
        return courseGoal.id !== id;
      });
    });
  }

  return (
    <View style={styles.appContatiner}>
      <Button
        title="Add New Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} />
      <View style={styles.goalsContainer}>
        <Text style={styles.goalsHeadder}>List of Goals...</Text>
        <FlatList
          keyExtractor={(item, index) => {
            return item.id + index;
          }}
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
        />
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

  goalsHeadder: {
    color: "brown",
    fontWeight: "bold",
    fontSize: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
