import { login } from "./userService";

export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({type: 'USER_LOGIN_PENDING'});
        const response = await login(email, password);
        window.localStorage.setItem('logreviewer-token', response.data.token);
        dispatch({
            type: 'USER_LOGIN',
            payload: response.data,
        });
        dispatch({type: 'USER_LOGIN_FULFILLED'});
    } catch (error) {
        console.log(error);
        dispatch({ type: 'USER_LOGIN_ERROR' });
    }
};