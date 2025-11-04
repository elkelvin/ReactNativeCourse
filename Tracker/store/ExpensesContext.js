import { createContext, useReducer, useState } from "react";



export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ id, description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
    setExpenses: (expenses) => { }
})

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [action.payload, ...state];
        case "UPDATE":
            const updateIndex = state.findIndex(expense => expense.id === action.payload.id);
            const expenseToUpdate = state[updateIndex];
            const updateItem = { ...expenseToUpdate, ...action.payload.data };
            const updateExpenses = [...state];
            updateExpenses[updateIndex] = updateItem;
            return updateExpenses;
        case "DELETE":
            return state.filter(expense => expense.id !== action.payload)
        case "SET":
            return action.payload.reverse();
        default: return state;
    }
}

const ExpensesContextProvider = ({ children }) => {

    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    const setExpenses = (expenses) => {
        dispatch({ type: "SET", payload: expenses })
    };
    const addExpense = (data) => {
        dispatch({ type: "ADD", payload: data });
    };
    const deleteExpense = (id) => {
        dispatch({ type: "DELETE", payload: id })
    };
    const updateExpense = (id, data) => {
        dispatch({ type: "UPDATE", payload: { id: id, data: data } })
    };

    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider;