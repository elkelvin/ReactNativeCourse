import { View, StyleSheet, Text, Alert, FlatList, useWindowDimensions } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import TitleComponent from "../components/ui/TitleComponent";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialNumber = generateRandomBetween(1, 100, userNumber);
  const [currentNumber, setCurrentNumber] = useState(initialNumber);
  const [guessRounds, setGuessRounds] = useState([initialNumber])
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (currentNumber === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentNumber, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentNumber < userNumber) ||
      (direction === "greater" && currentNumber > userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentNumber;
    } else {
      minBoundary = currentNumber + 1;
    }
    const newRnd = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentNumber
    );
    setCurrentNumber(newRnd);
    setGuessRounds(prev => [newRnd, ...prev]);
  };

  const guessRoundLenght = guessRounds.length;

  let content = <>
    <NumberContainer>{currentNumber}</NumberContainer>
    <Card>
      <InstructionText style={style.instructionText}>
        Higher or lower?
      </InstructionText>
      <View style={style.buttonsContainer}>
        <View style={style.button}>
          <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="remove" size={24} color="white" />
          </CustomButton>
        </View>
        <View style={style.button}>
          <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="add" size={24} color="white" />
          </CustomButton>
        </View>
      </View>
    </Card>
  </>;

  if (width > 500) {
    console.log("entro");
    content = <>
      <View style={style.landscape}>
        <View style={style.button}>
          <CustomButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="remove" size={24} color="white" />
          </CustomButton>
        </View>
        <NumberContainer>{currentNumber}</NumberContainer>
        <View style={style.button}>
          <CustomButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="add" size={24} color="white" />
          </CustomButton>
        </View>
      </View>
    </>;
  }
  return (
    <View style={style.screen}>
      <TitleComponent style={style.title}>Opponent's Guess</TitleComponent>
      {content}
      <View style={style.listContainer}>
        {/* {guessRounds.map(round => <Text key={round}>{round}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={
            (itemData) => (
              <GuessLogItem roundNumber={guessRoundLenght - itemData.index} guess={itemData.item} />
            )
            // <Text>{itemData.item}</Text>)
          }
          keyExtractor={(item, index) => item}
        />
      </View>
    </View>
  );
};

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center"
  },
  landscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  instructionText: {
    marginBottom: 12,
  },
  title: {
    marginTop: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
export default GameScreen;
