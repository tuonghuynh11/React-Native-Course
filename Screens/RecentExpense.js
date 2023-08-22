import { Text, View, StyleSheet } from "react-native";
import TopTextBorder from "../Component/UI/TopTextBorder";
import ExpenseItem from "../Component/ExpenseOutput/ExpenseItem";
import { GlobalStyles } from "../constants/styles";
import ExpenseOutput from "../Component/ExpenseOutput/ExpenseOutput";
import EXPENSE from "../Store/dummyData";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../Store/expense-context";
import { fetchExpenses } from "../http";
import LoadingOverlay from "../Component/UI/LoadingOverlay";
import ErrorOverlay from "../Component/UI/ErrorOVerlay";
function RecentExpense({ navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const expenseCtx = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (err) {
        setError("Could not fetch expenses !!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  const expenseData = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    if (
      today.getFullYear() === expense.date.getFullYear() &&
      today.getMonth() === expense.date.getMonth()
    ) {
      if (today.getDate() - expense.date.getDate() <= 7) {
        return true;
      }
    }
    return false;
  });
  return (
    <View style={styles.rootContainer}>
      <ExpenseOutput
        expensesData={expenseData}
        expensesPeriod={"Last 7 Days"}
        fallbackText={"No expenses registered for the last 7 days."}
        navigation={navigation}
      />
    </View>
  );
}

export default RecentExpense;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
