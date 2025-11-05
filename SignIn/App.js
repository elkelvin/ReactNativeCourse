import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { Colors } from './constants/styles';
import WelcomeScreen from './screens/WelcomeScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: "white",
      contentStyle: { backgroundColor: Colors.primary100 }
    }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>);
}
const SystemNavigation = () => {
  <NavigationContainer>
    <AuthStack />
  </NavigationContainer>
}
export const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SystemNavigation />
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
