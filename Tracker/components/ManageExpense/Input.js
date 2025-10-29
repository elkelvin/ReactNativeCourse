import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyle } from "../../constans/globalStyle";
const Input = ({ label, setting, style, invalid }) => {

    let inputStyle = [styles.input];
    if (setting && setting.multiline) {
        inputStyle.push(styles.inputMultiline);
    }

    if(invalid){
        inputStyle.push(styles.invalidInput);
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyle} {...setting} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyle.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyle.colors.primary100,
        color: GlobalStyle.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    invalidLabel: {
        color: GlobalStyle.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyle.colors.error500
    }
});
export default Input;