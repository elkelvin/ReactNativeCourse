import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
const LoadingOverlay = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.messsage}>{message}</Text>
            <ActivityIndicator size="large" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 32
    },
    messsage: {
        fontSize: 16,
        marginBottom: 12
    }
})
export default LoadingOverlay;