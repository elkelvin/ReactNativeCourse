import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "./MealItem";


const MealsList = ({ items }) => {
    const renderMealItem = (item) => {
        const element = item.item;
        const props = {
            id: element.id,
            title: element.title, urlImg: element.imageUrl, duration: element.duration,
            complexity: element.complexity, affordability: element.affordability,
        };
        return <MealItem {...props} />
    }

    return (
        <View style={style.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default MealsList;