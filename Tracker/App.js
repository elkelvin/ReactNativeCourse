import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomTabs } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screen/ManageExpense';
import RecentExpenses from './screen/RecentExpenses';
import AllExpenses from './screen/AllExpenses';
import { GlobalStyle } from './constans/globalStyle';
import IconButton from './UI/IconButton';
import ExpensesContextProvider from './store/ExpensesContext';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <BottomTabs.Navigator screenOptions=
      {
        ({ navigation }) => (
          {
            headerStyle: { backgroundColor: GlobalStyle.colors.primary500 },
            headerTintColor: "white",
            tabBarStyle: { backgroundColor: GlobalStyle.colors.primary500 },
            tabBarActiveTintColor: GlobalStyle.colors.accent500,
            headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => { navigation.navigate("ManageExpense") }} />
          })
      }
    >
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent",
        tabBarIcon: ({ color, size }) => (<Ionicons name="hourglass" size={size} color={color} />)
      }} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title: "All Expenses",
        tabBarLabel: "All Expenses",
        tabBarIcon: ({ color, size }) => (<Ionicons name="calendar" size={size} color={color} />)
      }} />

    </BottomTabs.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: GlobalStyle.colors.primary500 }, headerTintColor: "white" }}>
            <Stack.Screen name="ExpensesOverview" component={BottomNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{ title: 'Manage Expense', presentation: "modal" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}