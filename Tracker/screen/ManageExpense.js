import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyle } from "../constans/globalStyle";
import { ExpensesContext } from "../store/ExpensesContext";
import IconButton from "../UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

const ManageExpense = ({ route, navigation }) => {
    const expensesCTX = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesCTX.expenses.find((expense) => expense.id === editedExpenseId);
    useLayoutEffect(() => {
        navigation.setOptions({
            tittle: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing])

    const onDeleteExpenseHandler = () => {
        expensesCTX.deleteExpense(editedExpenseId);
        navigation.goBack();
    }
    const onCancelHandler = () => {
        navigation.goBack();
    };
    const onConfirmHandler = (expenseData) => {
        if (isEditing) {
            expensesCTX.updateExpense(editedExpenseId, expenseData)
        } else {
            expensesCTX.addExpense(expenseData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ExpenseForm onSubmit={onConfirmHandler} onCancelHandler={onCancelHandler}
                submitButtonLabel={isEditing ? "Update" : "Add"}
                defaultValue={selectedExpense}
            />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyle.colors.primary200,
        alignItems: "center"
    }
});
export default ManageExpense;