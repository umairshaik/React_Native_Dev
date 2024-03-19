import { StyleSheet, Text, View } from "react-native";
import MyColors from "../../util/Colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: MyColors.accent500,
    padding: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: MyColors.accent500,
    fontSize: 36,
    fontWeight: "bold",
  },
});
