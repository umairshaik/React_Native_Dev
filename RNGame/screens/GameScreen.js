import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import MyColors from "../util/Colors";

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

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess == userNumber) {
      console.log("guess is correct");
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
      minBoundary = currentGuess;
    }
    setCurrentGuess(
      generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, LOWER)}>
              <Ionicons name="remove" size={24} color={MyColors.secondary500} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, GREATER)}>
              <Ionicons name="add" size={24} color={MyColors.secondary500} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 16,
  },
});
