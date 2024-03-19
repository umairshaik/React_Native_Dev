import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient
      colors={["#ddb52f", "#4e0329"]}
      style={styles.rootContainer}
    >
      <ImageBackground
        style={styles.backgroundContainer}
        resizeMode="cover"
        imageStyle={{ opacity: 0.35 }}
        source={require("./assets/BackgroundImage/background.png")}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#ddb52f",
  },
  backgroundContainer: {
    flex: 1,
  },
});
