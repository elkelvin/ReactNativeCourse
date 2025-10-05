import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/data";
const FavoriteScreen = () => {
    const favoriteMealCtx = useContext(FavoritesContext);
    const favoriteMeals = MEALS.filter(meal => favoriteMealCtx.ids.includes(meal.id));

    if (favoriteMeals.length === 0) {
        return <View style={styles.rootContainer}>
            <Text style={text}>You have no favorite meals yet</Text>
        </View>
    }

    return (
        <MealsList items={favoriteMeals} />
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    }
});
export default FavoriteScreen;