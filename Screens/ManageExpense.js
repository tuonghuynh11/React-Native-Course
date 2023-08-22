import { Text, View, StyleSheet, TextInput } from "react-native";
import Button from "../Component/UI/Button";
import IconButton from "../Component/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext, useState } from "react";
import { ExpensesContext } from "../Store/expense-context";
import ExpenseForm from "../Component/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../http";
import LoadingOverlay from "../Component/UI/LoadingOverlay";
import ErrorOverlay from "../Component/UI/ErrorOVerlay";

function ManageExpense({ navigation, route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const expenseCtx = useContext(ExpensesContext);
  const expenseID = route.params?.expenseID;
  const isUpdate = !!expenseID;
  const expenseSelected = expenseCtx.expenses.find(
    (expense) => expense.id === expenseID
  );

  let btnText = "Add";

  if (isUpdate) {
    btnText = "Update";
  }
  navigation.setOptions({
    title: isUpdate ? "Edit Expense" : "Add Expense",
  });

  function cancelBtnHandler() {
    navigation.goBack();
  }
  async function addBtnHandler(expenseData) {
    setIsFetching(true);
    try {
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({ ...expenseData, id: id });
      cancelBtnHandler(); // cancel
    } catch (err) {
      setError("Could not save data - please try again try again later!");
      setIsFetching(false);
    }
  }
  async function updateBtnHandler(expenseData) {
    setIsFetching(true);
    try {
      expenseCtx.updateExpense(expenseID, expenseData);
      await updateExpense(expenseID, expenseData);
      cancelBtnHandler(); // cancel
    } catch (err) {
      setError("Could not update data - please try again try again later!");
      setIsFetching(false);
    }
  }
  async function deleteBtnHandler() {
    setIsFetching(true);
    try {
      await deleteExpense(expenseID);
      expenseCtx.deleteExpense(expenseID);
      cancelBtnHandler(); // cancel
    } catch (err) {
      setError("Could not delete expense - please try again try again later!");
    }
    setIsFetching(false);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  let iconButton = (
    <IconButton
      color={GlobalStyles.colors.error500}
      size={50}
      icon={"trash"}
      onPress={deleteBtnHandler}
    />
  );
  if (!isUpdate) {
    iconButton = "";
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.expenseForm}>
        <ExpenseForm
          onCancel={cancelBtnHandler}
          onSubmit={addBtnHandler}
          onUpdate={updateBtnHandler}
          isUpdate={isUpdate}
          expenseSelected={expenseSelected}
        />
      </View>

      <View style={[btnText === "Update" ? styles.container : null]}>
        {iconButton}
      </View>
    </View>
  );
}

export default ManageExpense;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },

  container: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "white",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  expenseForm: {
    width: "100%",
  },
});
