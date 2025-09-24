import { StyleSheet, View, Text, FlatList } from "react-native";
import { MEALS } from "../data/data";
import MealItem from "../components/MealItem";
const MealsOverviewScreen = ({ route }) => {
  const categoryId = route.params.categoryId;
  const displayMeals = MEALS.filter(mealItem => mealItem.categoryIds.includes(categoryId));

  const renderMealItem = (item) => {
    return <MealItem item={item.item.title} />
  }

  return (
    <View style={style.container}>
      <Text>Meals Overview Screen {categoryId}</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={displayMeals}
        renderItem={renderMealItem}
      />
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
