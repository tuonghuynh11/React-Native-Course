import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
export default function App() {
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  function pickedNumberHandler(userNumber) {
    setUserNumber(userNumber);
  }
  function gameOverHandler() {
    setGameOver(true);
  }
  function newGameHandler() {
    setUserNumber(null);
    setGameOver(false);
    setGuessRounds(0);
    //screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  }
  function updateRounds(numberOfRounds) {
    setGuessRounds(numberOfRounds);
  }
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);
  const [fontsLoaded] = useFonts({
    "open-sans": require("./fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onUpdateRound={updateRounds}
        onGameOver={gameOverHandler}
      />
    );
  }
  if (gameIsOver) {
    screen = (
      <GameOver
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={newGameHandler}
      />
    );
  }

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <StatusBar style="light"></StatusBar>
      <ImageBackground
        source={require("./images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
