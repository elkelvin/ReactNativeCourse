import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from "../store/redux/favorites";
// import { FavoritesContext } from "../store/context/favorites-context";
const MealDetailScreen = ({ route, navigation }) => {
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);


    const mealId = route.params.mealId;
    const meal = MEALS.find(x => x.id === mealId);

    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealsIds.includes(mealId);

    const dispatch = useDispatch();
    const onChangeStatusHandler = () => {
        if (mealIsFavorite) {
            dispatch(removeFavorite, { id: mealId })
            // favoriteMealsCtx.removeFavorite(mealId);
        } else {
            // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite, { id: mealId })
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={
                    mealIsFavorite ? "star" : "star-outline"
                } color="white" onPress={onChangeStatusHandler} />
            }
        });
    }, [navigation, onChangeStatusHandler]);

    return (<ScrollView style={styles.rootContainer}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{meal.title}</Text>
        <MealDetails duration={meal.duration} complexity={meal.complexity} affordability={meal.affordability}
            styleText={styles.detailText}
        />
        <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={meal.ingredients} />

                <Subtitle>Steps</Subtitle>
                <List data={meal.steps} />
            </View>
        </View>

    </ScrollView>);
}

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: "100%",
        height: 350
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white"
    },
    detailText: {
        color: "white"
    },
    listOuterContainer: {
        alignItems: "center"
    },
    listContainer: {
        width: "80%",
    }
})
export default MealDetailScreen;