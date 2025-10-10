import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
const renderExpenseItem = (itemData) => {
    return (
        <ExpenseItem {...itemData.item} />
    );
}

const ExpensesList = ({ data }) => {
    return (<FlatList data={data} keyExtractor={(item, index) => item.id} renderItem={renderExpenseItem} />);

}

export default ExpensesList;