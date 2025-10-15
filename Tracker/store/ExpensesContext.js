import { createContext, useReducer, useState } from "react";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2021-12-19")
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 89.99,
        date: new Date("2022-01-05")
    },
    {
        id: "e3",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("2021-12-01")
    },
    {
        id: "e4",
        description: "A book",
        amount: 14.99,
        date: new Date("2022-02-19")
    },
    {
        id: "e5",
        description: "A book",
        amount: 18.99,
        date: new Date("2022-02-18")
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { }
})

const expensesReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id }, ...state];
        case "UPDATE":
            const updateIndex = state.findIndex(expense => expense.id === action.payload.id);
            const expenseToUpdate = state[updateIndex];
            const updateItem = { ...expenseToUpdate, ...action.payload.data };
            const updateExpenses = [...state];
            updateExpenses[updateIndex] = updateItem;
            return updateExpenses;
        case "DELETE":
            return state.filter(expense => expense.id !== action.payload)
        default: return state;
    }
}

const ExpensesContextProvider = ({ children }) => {

    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
        updateExpense: updateExpense
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
export default ExpensesContextProvider;