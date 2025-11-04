import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyle } from "../constans/globalStyle";
import { ExpensesContext } from "../store/ExpensesContext";
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import IconButton from "../UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
    const [isProcessing, setIsProccesing] = useState(false);
    const [error, setError] = useState();
    const expensesCTX = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const selectedExpense = expensesCTX.expenses.find((expense) => expense.id === editedExpenseId);
    useLayoutEffect(() => {
        navigation.setOptions({
            tittle: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing])

    const onDeleteExpenseHandler = async () => {
        setIsProccesing(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCTX.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError("Could not delete expense - please try again later!");
            setIsProccesing(false);
        }
    }

    const onConfirmErrorHandler = () => {
        setError();
    }
    const onCancelHandler = () => {
        navigation.goBack();
    };

    const onConfirmHandler = async (expenseData) => {
        setIsProccesing(true);
        try {
            if (isEditing) {
                expensesCTX.updateExpense(editedExpenseId, expenseData)
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCTX.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - please try again later!");
            setIsProccesing(false);
        }
    };


    if (error && !isProcessing) {
        return <ErrorOverlay error={error} onConfirm={onConfirmErrorHandler} />
    }

    if (isProcessing) {
        return <LoadingOverlay />
    }
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