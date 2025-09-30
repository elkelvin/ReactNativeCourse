import { StyleSheet, View, Text, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../data/data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
const MealsOverviewScreen = ({ route, navigation }) => {
  const categoryId = route.params.categoryId;
  const displayMeals = MEALS.filter(mealItem => mealItem.categoryIds.includes(categoryId));

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => category.id == categoryId).title;
    navigation.setOptions({
      title: categoryTitle
    });
  }, [categoryId, navigation]);

  const renderMealItem = (item) => {
    const element = item.item;
    const props = {
      title: element.title, urlImg: element.imageUrl, duration: element.duration,
      complexity: element.complexity, affordability: element.affordability
    };
    return <MealItem {...props} />
  }

  return (
    <View style={style.container}>
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
