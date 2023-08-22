import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Title from "../components/Title.ios";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
function GameOver({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  function StartNewGame() {
    onStartNewGame();
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={[styles.image]}
            source={require("../images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPressBtn={StartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}
export default GameOver;
// const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  imageContainer: {
    // width: deviceWidth <= 390 ? 350 : 400,
    // height: deviceWidth <= 390 ? 350 : 400,
    // borderRadius: deviceWidth <= 390 ? 175 : 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginTop: 0,
    margin: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
