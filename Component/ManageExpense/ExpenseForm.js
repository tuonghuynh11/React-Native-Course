import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({
  onCancel,
  onSubmit,
  onUpdate,
  isUpdate,
  expenseSelected,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: expenseSelected ? expenseSelected.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: expenseSelected ? getFormattedDate(expenseSelected.date) : "",
      isValid: true,
    },
    description: {
      value: expenseSelected ? expenseSelected.description.toString() : "",
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier, enterValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enterValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: parseFloat(inputs.amount.value.toString().replace(",", ".")),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }
  function submitUpdateHandler() {
    const expenseData = {
      amount: parseFloat(inputs.amount.value.toString().replace(",", ".")),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onUpdate(expenseData);
  }
  let btnText = "Add";

  if (isUpdate) {
    btnText = "Update";
  }
  const secondBtn = (
    <Button
      onPress={isUpdate ? submitUpdateHandler : submitHandler}
      style={styles.button}
    >
      {btnText}
    </Button>
  );

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize:'none',
          // autoCorrect:false,//Default:true
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Values - Please Check The Entered Data !
        </Text>
      )}
      <View>
        <View style={styles.buttonGroup}>
          <Button onPress={onCancel} mode={"flat"} style={styles.button}>
            Cancel
          </Button>
          {secondBtn}
        </View>
      </View>
    </View>
  );
}
export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonGroup: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
  },
});
