import { View, Text, TextInput, Alert, StyleSheet, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import { useState } from "react";
import Colors from "../constants/colors";
import TitleComponent from "../components/ui/TitleComponent";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
const StartGameScreen = (props) => {
  const [txtInput, setTxtInput] = useState("");

  const { width, height } = useWindowDimensions();

  const onReset = () => {
    setTxtInput("");
  };

  const onConfirmInputHandler = () => {
    const chosenNumber = parseInt(txtInput);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: onReset }]
      );
      return;
    }
    props.onPickNumber(chosenNumber);
  };

  const marginTop = height < 380 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.RootContainer, { marginTop: marginTop }]}>
          <TitleComponent>Guess My Number</TitleComponent>
          {/* <View style={styles.Container}> */}
          <Card>
            {/* <Text style={styles.InstructionText}>Enter a Number</Text> */}
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.Input}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={txtInput}
              onChangeText={setTxtInput}
            />

            <View style={styles.ButtonsContainer}>
              <View style={styles.ButtonContainer}>
                <CustomButton onPress={onReset}>Reset</CustomButton>
              </View>
              <View style={styles.ButtonContainer}>
                <CustomButton onPress={onConfirmInputHandler}>Confirm</CustomButton>
              </View>
            </View>
            {/* </View> */}
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  RootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  Container: {
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    // Box-shadow Android
    elevation: 4,
    //Box shadow ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,

    // justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "column",
  },
  Input: {
    height: 60,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  ButtonsContainer: {
    // flex: 1,
    // width: "100%",
    flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
  },
  ButtonContainer: {
    flex: 1,
  },
  // InstructionText: {
  //   color: Colors.accent500,
  //   fontSize: 24,
  // },
});
export default StartGameScreen;
