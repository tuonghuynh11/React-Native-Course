import { FlatList, StyleSheet, View, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
import TopTextBorder from "../UI/TopTextBorder";
import { getFormattedDate } from "../../date";

function ExpenseOutput({
  expensesData,
  expensesPeriod,
  fallbackText,
  price,
  navigation,
}) {
  function renderItem(itemData) {
    const date = itemData.item.date;
    function ViewManageExpense() {
      navigation.navigate("ManageExpense", {
        expenseID: itemData.item.id,
      });
    }
    return (
      <ExpenseItem
        title={itemData.item.description}
        date={getFormattedDate(date)}
        price={itemData.item.amount.toFixed(2)}
        onPress={ViewManageExpense}
      />
    );
  }
  function calculateTotalPrice() {
    const total = expensesData.reduce(function (sum, expense) {
      return sum + expense.amount;
    }, 0);
    return total;
  }
  const total = calculateTotalPrice();
  let content = (
    <FlatList
      style={styles.rootContainer}
      data={expensesData}
      renderItem={renderItem}
    />
  );
  if (expensesData.length === 0) {
    content = <Text style={styles.fallbackText}> {fallbackText}</Text>;
  }

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <TopTextBorder text={expensesPeriod} price={total.toFixed(2)} />
        {content}
      </View>
    </View>
  );
}
export default ExpenseOutput;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginTop: 8,
    padding: 10,
  },
  topContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  fallbackText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
