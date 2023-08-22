import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function TopTextBorder({ text, price }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{text}</Text>
      <Text style={styles.priceStyle}>${price}</Text>
    </View>
  );
}
export default TopTextBorder;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 19,
    color: GlobalStyles.colors.primary400,
    fontWeight: "500",
  },
  priceStyle: {
    fontSize: 22,
    color: GlobalStyles.colors.primary400,
    fontWeight: "bold",
  },
});
