import { login } from "./userService";


export const loginAction = (email, password) => async(dispatch) => {
    //issue login request

    const response = await login(email, password);
    //save token jwt
    window.localStorage.setItem('logreviewer-token', response.data.token);
    //dispatch redux action

    dispatch({
        type:USER_LOGIN,
        payload: response.data,
    });

};