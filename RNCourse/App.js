import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.dummyStyle}>Another piece of Text</Text>
      </View>
      <Text
        style={{
          color: "lightblue",
          margin: 16,
          borderWidth: 2,
          borderColor: "red",
          padding: 4,
        }}
      >
        Hello World!
      </Text>
      <Button title="Tap me!" onPress={() => console.log("On pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dummyStyle: {
    margin: 16,
    borderWidth: 2,
    borderColor: "blue",
    padding: 4,
  },
});
