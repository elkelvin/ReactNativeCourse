import { useContext } from "react";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/ExpensesContext";
const AllExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);
    return (<ExpensesOutput expensesPeriod="Total" expenses={expenseCtx.expenses} fallbackText="No registered expenses found"/>);
}
export default AllExpenses;