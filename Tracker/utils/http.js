import axios from "axios";

const API = "https://react-native-3ee7a-default-rtdb.firebaseiocom";
const EXPENSE = `${API}/expenses.json`;

export const storeExpense = async (expenseData) => {
    const response = await axios.post(EXPENSE, expenseData);
    const id = response.data.name;
    return id;
}


export const getExpenses = async () => {
    const response = await axios.get(EXPENSE);
    const expenses = [];
    for (const key in response.data) {
        const tmpExpense = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(tmpExpense);
    }
    return expenses;
}

export const updateExpense = async (id, expenseData) => {
    return axios.put(API + `/expenses/${id}.json`, expenseData);
}

export const deleteExpense = async (id) => {
    return axios.delete(API + `/expenses/${id}.json`);
}