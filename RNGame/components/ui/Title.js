import { StyleSheet, Text } from "react-native";
import MyColors from "../../util/Colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    padding: 12,
    color: MyColors.secondary500,
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: MyColors.secondary500,
  },
});
