import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";
import MealDetails from "../MealDetails";
const MealItem = ({ id, title, urlImg, duration, complexity, affordability }) => {
    const navigation = useNavigation();

    const onSelectMealItemHandler = () => {
        navigation.navigate("MealDetail", {
            mealId: id
        });
    }

    const props = { duration, complexity, affordability };
    return (
        <View style={style.mealItem}>
            <Pressable android_ripple={{ color: "#ccc" }} style={({ pressed }) => {
                pressed ? style.buttonPressed : null
            }} onPress={onSelectMealItemHandler}>
                <View style={style.innerContainer}>
                    <View >
                        <Image source={{ uri: urlImg }} style={style.image} />
                        <Text style={style.title}>{title}</Text>
                    </View>
                    <MealDetails {...props} />
                </View>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8
    },
    innerContainer: {
        borderRadius: 8
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 8
    },
    buttonPressed: {
        opacity: 0.5
    }
});
export default MealItem;