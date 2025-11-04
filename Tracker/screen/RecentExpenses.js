import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDate } from "../utils/date";
import { getExpenses } from "../utils/http";
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from "../UI/ErrorOverlay";

const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        const getExpense = async () => {
            setIsFetching(true);
            try {
                const expenses = await getExpenses();
            }
            catch (error) {
                setError("Could not fecth expenses");
            }
            setIsFetching(false);
            expensesCtx.setExpenses(expenses);
        };
        getExpense();
    }, []);

    if (isFetching) {
        return <LoadingOverlay />
    }
    if (error && !isFetching) {
        return <ErrorOverlay error={error} onConfirm={() => setError()} />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDate(today, 7);
        return expense.date > date7DaysAgo;
    });

    return (<ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} fallbackText="No expenses registered for the last 7 days" />)
}
export default RecentExpenses;