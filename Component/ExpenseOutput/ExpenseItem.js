import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpenseItem({ title, date, price, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: GlobalStyles.colors.primary100 }}
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.rootContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;
const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: "white",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    color: GlobalStyles.colors.primary400,
  },
  priceBox: {
    textAlign: "center",
    width: 100,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "white",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
