import { View, FlatList, Text } from "react-native";
import { CATEGORIES } from '../data/data'
import CategoryGridTitle from "../components/CategoryGridTitle";

const renderItem = (itemData) => {
    return <CategoryGridTitle title={itemData.item.title} color={itemData.item.color} />
}
const CategoriesScreen = () => {
    return (
        < FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderItem}
            numColumns={2}
        />
    );
}
export default CategoriesScreen;