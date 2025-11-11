import { useContext, useEffect ,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthContextProvider, { AuthContext } from './store/auth-context';
import { Colors } from './constants/styles';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

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
  const context = useContext(AuthContext);
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: Colors.primary500 },
      headerTintColor: "white",
      contentStyle: { backgroundColor: Colors.primary100 }
    }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={context.logout} />
      }} />
    </Stack.Navigator>);
}

const SystemNavigation = () => {
  const context = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!context.isAuthenticated && <AuthStack />}
      {context.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = () => {
  const [isReady, setIsReady] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsReady(true);
    };
    getToken();
  }, []);


  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady)
    return null;

  return <SystemNavigation />;
}

const App = () => {

  return (
    <>
      <AuthContextProvider>
        <StatusBar style="light" />
        <Root />
      </AuthContextProvider>
    </>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
