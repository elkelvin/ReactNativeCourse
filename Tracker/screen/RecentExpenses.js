import { useContext } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
import { getDateMinusDate } from "../utils/date";
const RecentExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDate(today, 7);
        return expense.date > date7DaysAgo;
    });

    return (<ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} fallbackText="No expenses registered for the last 7 days" />)
}
export default RecentExpenses;