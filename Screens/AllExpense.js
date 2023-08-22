import { Text, View, StyleSheet } from "react-native";
import ExpenseItem from "../Component/ExpenseOutput/ExpenseItem";
import { GlobalStyles } from "../constants/styles";
import ExpenseOutput from "../Component/ExpenseOutput/ExpenseOutput";
import EXPENSE from "../Store/dummyData";
import { useContext } from "react";
import { ExpensesContext } from "../Store/expense-context";
function AllExpense({ navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <View style={styles.rootContainer}>
      <ExpenseOutput
        expensesData={expensesCtx.expenses}
        expensesPeriod={"Total"}
        fallbackText={"No registered expenses found!"}
        navigation={navigation}
      />
    </View>
  );
}

export default AllExpense;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
