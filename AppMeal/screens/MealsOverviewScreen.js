import { StyleSheet, View, Text } from "react-native";
import { MEALS } from "../data/data";
const MealsOverviewScreen = () => {
  return (
    <View style={style.container}>
      <Text>Meals Overview Screen</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
export default MealsOverviewScreen;
