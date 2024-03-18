import { ImageBackground, StyleSheet, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  return (
    <View colors={[]} style={styles.rootContainer}>
      <ImageBackground
        style={styles.backgroundContainer}
        resizeMode="cover"
        imageStyle={{ opacity: 0.35 }}
        source={require("./assets/BackgroundImage/background.png")}
      >
        <StartGameScreen />
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
