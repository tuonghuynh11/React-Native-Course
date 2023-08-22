import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();
  function numberInputHandler(input) {
    setEnteredNumber(input);
  }
  function resetInputNumber() {
    setEnteredNumber("");
  }
  function confirmInputHandler() {
    const choseNumber = parseInt(enteredNumber);
    if (isNaN(choseNumber)) {
      Alert.alert("Invalid Number", "Please enter a number", [
        { text: "Okay", style: "destructive", onPress: resetInputNumber },
      ]);
      return;
      return;
    } else if (choseNumber <= 0 || choseNumber > 99) {
      Alert.alert("Invalid Number", "Please enter a number between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputNumber },
      ]);
      return;
    } else {
      onPickNumber(choseNumber);
    }
    console.log(enteredNumber.toString());
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.backGroundContainer}
        behavior="position"
      >
        <View style={styles.mainScreen}>
          {/* <View style={styles.messageBoxContainer}>
        <Text style={styles.text}>Guess My Number</Text>
      </View> */}
          <Title>Guess My Number</Title>
          <Card>
            <Text style={{ color: "orange", fontSize: 20 }}>
              Enter a Number{" "}
            </Text>
            <TextInput
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.numberInput}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonGroup}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressBtn={resetInputNumber}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPressBtn={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  messageBoxContainer: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 100,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  backGroundContainer: {
    flex: 1,
  },
  mainScreen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  inputContainer: {
    width: "90%",
    marginTop: 20,
    padding: 16,
    backgroundColor: "#72063c",
    alignItems: "center",
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#72063c",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  numberInput: {
    fontSize: 30,
    width: 50,
    color: "orange",
    fontWeight: "bold",
    borderBottomColor: "orange",
    borderBottomWidth: 3,
    margin: 20,
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default StartGameScreen;
