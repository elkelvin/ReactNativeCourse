import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
const LoginScreen = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const context = useContext(AuthContext);

    const onLoginHandler = async ({ email, password }) => {
        setShowSpinner(true);
        try {
            const token = await login(email, password);
            context.authenticate(token);
        } catch (Error) {
            Alert.alert("Authentication failed!", "Could not log you in. Please check your credentials or try again lattter!");
            setShowSpinner(false);
        }
    }

    if (showSpinner) {
        return <LoadingOverlay message="Logging you in..." />;
    }
    return <AuthContent isLogin onAuthenticate={onLoginHandler} />;
}

export default LoginScreen;
