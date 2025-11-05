import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";
const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const { email: emailIsInvalid, confirmEmail: emailsDontMatch, password: passwordIsInvalid, confirmPassword: passwordsDontMatch, } = credentialsInvalid;

    const updateInputValueHandler = (inputType, enteredValue) => {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    const submitHandler = () => {
        onSubmit({
            email: enteredEmail, confirmEmail: enteredConfirmEmail,
            password: enteredPassword, confirmPassword: enteredConfirmPassword,
        });
    }


    return (
        <View style={styles.form}>
            <View>
                <Input
                    label="Email Address"
                    onUpdateValue={(value) => updateInputValueHandler("email", value)}
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Email Address"
                        onUpdateValue={(value) => updateInputValueHandler('confirmEmail', value)}
                        value={enteredConfirmEmail}
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label="Password"
                    onUpdateValue={(value) => updateInputValueHandler('password', value)}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        onUpdateValue={(value) => updateInputValueHandler('confirmPassword', value)}
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});
export default AuthForm;