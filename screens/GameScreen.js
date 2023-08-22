import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import GuessLogItem from "../components/GuessLogItem";
import Title from "../components/Title";
function generateRandomBetween(min, max, exclude) {
  // console.log(min, max, exclude);
  //   let randomNumber = Math.floor(Math.random() * (max - min)) + min;
  //   while (randomNumber === exclude) {
  //     randomNumber = Math.floor(Math.random() * (max - min)) + min;
  //   }

  //   return randomNumber;
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;
function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { width, height } = useWindowDimensions();
  //Hàm được gọi khi các biến trong mảng có sự thay đổi
  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onUpdateRound(guessRounds.length);
      props.onGameOver();
    }
  }, [currentGuess, props.userNumber, props.onGameOver]);

  //khi truyền mảng trống thì hàm chỉ chạy khi render lần đầu, nếu đã tồn tại màn hình này thì không gọi
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "higher" && currentGuess > props.userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong....", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((preGuessRounds) => [newRndNumber, ...preGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;
  let content = (
    <>
      <Text style={styles.numberGuess}>{currentGuess}</Text>
      <Card>
        <Text style={styles.text}>Higher or lower?</Text>
        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <PrimaryButton onPressBtn={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPressBtn={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <PrimaryButton onPressBtn={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <Text style={styles.numberGuess1}>{currentGuess}</Text>
          <View style={styles.button}>
            <PrimaryButton onPressBtn={nextGuessHandler.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <View style={styles.screen}>
      <Title style={styles.titleContainer}>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={guessRounds}
          renderItem={(itemData) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              ></GuessLogItem>
            );
          }}
          keyExtractor={(item) => item + "key"}
        ></FlatList>
      </View>
    </View>
  );
}
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    padding: 12,
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  numberGuess: {
    width: "90%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "orange",
    borderWidth: 5,
    borderColor: "orange",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: deviceWidth < 380 ? 20 : 40,
    marginBottom: 50,
  },
  numberGuess1: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "orange",
    borderWidth: 5,
    borderColor: "orange",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: deviceWidth < 380 ? 20 : 40,
  },
  text: {
    color: "orange",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
  interactContainer: {
    width: "90%",
    backgroundColor: "#72063c",
    borderRadius: 10,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  list: {
    padding: 10,
  },
  mainScreen: {
    flex: 1,
  },
});
export default GameScreen;
