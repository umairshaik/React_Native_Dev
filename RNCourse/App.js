import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCouserGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(inputText) {
    console.log("on click: " + inputText);
    setCouserGoals((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: inputText, id: Math.random().toString },
    ]);
    endAddGoalHandler();
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
    <>
      <StatusBar style="light" />
      <View style={styles.appContatiner}>
        <View style={styles.addGoalButton}>
          <Button
            title="Add New Goal"
            color="#5e0acc"
            onPress={startAddGoalHandler}
          />
        </View>
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endAddGoalHandler}
        />
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
    </>
  );
}

const styles = StyleSheet.create({
  appContatiner: {
    padding: 40,
    flex: 1,
    paddingHorizontal: 16,
  },

  goalsHeadder: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  addGoalButton: {
    alignItems: "flex-end",
  },
});
