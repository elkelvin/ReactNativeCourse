import { View, FlatList, Text } from "react-native";
import { CATEGORIES } from '../data/data'
const CategoriesScreen = () => {
    return (
        <View>
            {/* {CATEGORIES.map(c => <Text key={c.id}>{c.title}</Text>)} */}
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={CATEGORIES}
                renderItem={({ item }) => (<Text>{item.title}</Text>)
                }
            />
        </View>);
}
export default CategoriesScreen;