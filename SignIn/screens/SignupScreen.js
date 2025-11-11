import { useContext, useState } from 'react';
import { createUser } from '../util/auth';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
const SignupScreen = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    const context = useContext(AuthContext);

    const onSignUpHandler = async ({ email, password }) => {
        setShowSpinner(true);
        try {
            const token = await createUser(email, password);
            context.authenticate(token);
        } catch (error) {
            Alert.alert("Authentication failed", "Could not create user, please check your input and try again later")
            setShowSpinner(false);
        }
    }

    if (showSpinner) {
        return <LoadingOverlay message="Creating User..." />
    }
    return <AuthContent onAuthenticate={onSignUpHandler} />;
}

export default SignupScreen;
