import { View, FlatList, Text } from "react-native";
import { CATEGORIES } from "../data/data";
import CategoryGridTitle from "../components/CategoryGridTitle";

const CategoriesScreen = ({ navigation }) => {
  const renderItem = (itemData) => {
    const onPressHandler = () => {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id
      });
    };

    return (
      <CategoryGridTitle
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={onPressHandler}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};
export default CategoriesScreen;
