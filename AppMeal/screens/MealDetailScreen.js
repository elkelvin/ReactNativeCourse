import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
const MealDetailScreen = ({ route, navigation }) => {
    const mealId = route.params.mealId;
    const meal = MEALS.find(x => x.id === mealId);


    const onHeaderButtonPressHandler = () => {
        console.log("Hello!");
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon="star" color="white" onPress={onHeaderButtonPressHandler} />
            }
        });
    }, [navigation]);

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