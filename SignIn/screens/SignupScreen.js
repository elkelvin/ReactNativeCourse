import { useState } from 'react';
import { createUser } from '../util/auth';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay'
const SignupScreen = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const onSignUpHandler = async ({ email, password }) => {
        setShowSpinner(true);
        await createUser(email, password);
        setShowSpinner(false);
    }

    if (showSpinner) {
        return <LoadingOverlay message="Creating User..."/>
    }
    return <AuthContent onAuthenticate={onSignUpHandler} />;
}

export default SignupScreen;
