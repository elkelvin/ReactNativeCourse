import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
const LoginScreen = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    const onLoginHandler = async ({ email, password }) => {
        setShowSpinner(true);
        await login(email, password);
        setShowSpinner(false);
    }

    if (showSpinner) {
        return <LoadingOverlay message="Login in" />;
    }
    return <AuthContent isLogin onAuthenticate={onLoginHandler} />;
}

export default LoginScreen;
