import axios from "axios"

const API_KEY = "AIzaSyAoepYDR2EjdewZI0HXsPqzCuW4IVUPQuo"; //"AIzaSyAoepYDR2EjdewZI0HXsPqzCuW4IVUPQuo";


const authenticate = async (mode, email, pwd) => {
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
        email: email,
        password: pwd,
        returnSecureToken: true
    });
}
const createUser = async (email, pwd) => {
    await authenticate("signUp", email, pwd);
}

const login = async (email, pwd) => {
    await authenticate("signInWithPassword", email, pwd);
}

export { createUser ,login};