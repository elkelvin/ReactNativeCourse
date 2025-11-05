import { Pressable, View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
const IconButton = ({ icon, color, size, onPress }) => {
    return (
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <View>
                <Ionicons name={icon} color={color} size={size} />
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        margin: 8,
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.7,
    },
});
export default IconButton;