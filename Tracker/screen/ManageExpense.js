import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyle } from "../constans/globalStyle";
import Button from "../UI/Button";

const ManageExpense = ({ route, navigation }) => {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            tittle: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing])

    const onDeleteExpenseHandler = () => {
        navigation.goBack();
    }
    const onCancelHandler = () => {
        navigation.goBack();
    };
    const onConfirmHandler = () => {
        navigation.goBack();
    };

    return (<View style={styles.container}>
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancelHandler}>Cancel</Button>
            <Button onPress={onConfirmHandler}>{isEditing ? "Update" : "Add"}</Button>
        </View>
        {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton icon="trash" color={GlobalStyle.colors.error500} size={36} onPress={onDeleteExpenseHandler} />
            </View>
        )}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyle.colors.primary800
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyle.colors.primary200,
        alignItems: "center"
    }
});
export default ManageExpense;