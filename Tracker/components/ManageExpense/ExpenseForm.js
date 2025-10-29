import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import { getFormattedDate } from "../../utils/date";
import Input from "./Input"
import Button from "../../UI/Button";
import { GlobalStyle } from "../../constans/globalStyle";
const ExpenseForm = ({ onSubmit, onCancelHandler, submitButtonLabel, defaultValue }) => {

    const [inputs, setInputs] = useState(
        {
            amount: {
                value: defaultValue ? defaultValue.amount.toString() : '',
                isValid: true
            },
            date: {
                value: defaultValue ? getFormattedDate(defaultValue.date) : '',
                isValid: true
            },
            description: {
                value: defaultValue ? defaultValue.description : '',
                isValid: true
            }
        }
    );

    const onInputChangeHandler = (inputIdentifier, txtInputValue) => {
        setInputs((current) => {
            return {
                ...current,
                [inputIdentifier]: {
                    value: txtInputValue,
                    isValid: true
                }
            }
        });
    };

    const onSubmitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Ivalud input', 'Please check your input value');
            setInputs((current) => {
                return {
                    amount: { value: current.amount.value, isValid: amountIsValid },
                    date: { value: current.date.value, isValid: dateIsValid },
                    description: { value: current.description.value, isValid: descriptionIsValid }
                }
            });
            return;
        }
        onSubmit(expenseData);
    }

    const formIsInValid = !Object.values(inputs).reduce((current, x) => current && x.isValid, true);

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input style={styles.rowInput} label="Amount"
                invalid={!inputs.amount.isValid}
                setting={{
                    keyboardType: "decimal-pad",
                    onChangeText: (txtInputValue) => onInputChangeHandler('amount', txtInputValue),
                    value: inputs.amount.value
                }} />
            <Input style={styles.rowInput} label="Date"
                invalid={!inputs.date.isValid} setting={
                    {
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: (txtInputValue) => { onInputChangeHandler("date", txtInputValue) },
                        value: inputs.date.value
                    }
                } />
        </View>
        <Input label="Description"
            invalid={!inputs.description.isValid}
            setting={
                {
                    multiline: true,
                    onChangeText: (txtInputValue) => onInputChangeHandler("description", txtInputValue),
                    value: inputs.description.value
                }
            } />

        {formIsInValid && <Text style={styles.errorText}>Invalid inpues values - please check your entered data!</Text>}
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={onSubmitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}
const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyle.colors.error500,
        margin: 8
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
});
export default ExpenseForm;