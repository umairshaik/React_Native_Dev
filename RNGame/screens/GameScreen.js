import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
const LOWER = "Lower";
const GREATER = "Greater";

function generateRandomBetween(min, max, exclude) {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {
    if (
      (direction === LOWER && currentGuess < userNumber) ||
      (direction === GREATER && currentGuess > userNumber)
    ) {
      Alert.alert("You have Lied", "Please dont lie to the system", [
        { text: "Okay", style: "destructive" },
      ]);
      return;
    }

    if (userNumber == currentGuess) {
      Alert.alert(
        "You already won",
        "The guessed number is the number you have choosen",
        [{ text: "YES", style: "destructive" }]
      );
      return;
    }

    if (direction == LOWER) {
      // directions=> 'lower' or 'greater'
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    setCurrentGuess(
      generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View style={{ flexDirection: "row" }}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, LOWER)}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, GREATER)}>
            +
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
