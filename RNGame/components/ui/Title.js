import { StyleSheet, Text } from "react-native";
import MyColors from "../../util/Colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}
export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: MyColors.secondary500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: MyColors.secondary500,
    padding: 12,
  },
});
