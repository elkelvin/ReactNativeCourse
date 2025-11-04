import { View, Text, StyleSheet } from "react-native"
import Button from "./Button";
import { GlobalStyle } from "../constans/globalStyle";
const ErrorOverlay = ({ error, onConfirm }) => {
    return (<View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
        <Text style={styles.text}>{error}</Text>
        <Button onPress={onConfirm}>Okay</Button>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary700
    },
    text: {
        color: "white",
        marginBottom: 8,
        textAlign: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default ErrorOverlay;
