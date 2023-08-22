import { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
function GoalInput(props) {
  const [enteredGoadText, setEnteredGoadText] = useState("");
  function goalInputHandler(enterText) {
    setEnteredGoadText(enterText);
  }
  function addGoalHandler() {
    if (enteredGoadText.trim().length == 0) {
      alert("Please enter a goal!");
      return;
    }
    props.onAddGoal(enteredGoadText);
    setEnteredGoadText("");
  }
  console.log(enteredGoadText);
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/dish1.png")}
        />
        <TextInput
          onChangeText={goalInputHandler}
          style={styles.textInput}
          placeholder="Your course goad!"
          value={enteredGoadText}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button onPress={addGoalHandler} title="Add Goal" />
          </View>
          <View style={styles.button}>
            <Button onPress={props.onCancelAddGoal} title="Cancel" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#84d0c1",
    backgroundColor: "#fadfad",
  },
  image: {
    width: 120,
    height: 120,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "white",
    color: "orange",
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: "40%",
    marginHorizontal: 8,
  },
});
export default GoalInput;
