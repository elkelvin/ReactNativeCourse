import { View, StyleSheet, Text, Image, Dimensions, useWindowDimensions, ScrollView } from "react-native";
import TitleComponent from "../components/ui/TitleComponent";
import Colors from "../constants/colors";
import CustomButton from "../components/ui/CustomButton";
const GameOverScreen = ({ roundNumber, userNumber, onStartNewGame }) => {

  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  
  if (width < 380) {
    imageSize = 150;
  }
  if (height < 450) {
    imageSize = 80;
  }
  
  const imageStyle = {
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize
  }

  return (
    <ScrollView style={style.screen}>
      <View style={style.rootContainer}>
        <TitleComponent>GAME OVER!</TitleComponent>
        <View style={[style.imageContainer, imageStyle]}>
          <Image
            style={style.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={style.summaryText}>
          Your phone needed <Text style={style.highlight}>{roundNumber}</Text>{" "}
          rounds to guess the number
          <Text style={style.highlight}>{userNumber}</Text>
        </Text>
        <CustomButton onPress={onStartNewGame}>Start New Game</CustomButton>
      </View >
    </ScrollView>
  );
};

const deviceWidth = Dimensions.get("window").width;
const style = StyleSheet.create({
  screen: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    // height: deviceWidth < 380 ? 150 : 300,
    // width: deviceWidth < 380 ? 150 : 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
export default GameOverScreen;
