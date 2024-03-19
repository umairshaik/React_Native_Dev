import { ImageBackground, StyleSheet, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";

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
    <View colors={[]} style={styles.rootContainer}>
      <ImageBackground
        style={styles.backgroundContainer}
        resizeMode="cover"
        imageStyle={{ opacity: 0.35 }}
        source={require("./assets/BackgroundImage/background.png")}
      >
        {screen}
      </ImageBackground>
    </View>
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
