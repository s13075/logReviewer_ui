import { login, register } from "./userService";
import { useDispatch} from 'react-redux';


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
        dispatch({type: 'SHOW_MENU_OPTIONS'})
    } catch (error) {
        console.log(error);
        dispatch({ type: 'USER_LOGIN_ERROR' });
    }
};

export const registerAction = (user) => async (dispatch) => {
    try {
        dispatch({type: 'USER_REGISTER_PENDING'});
        const response = await register(user);
         dispatch({
            type: 'USER_REGISTER',
            payload: {
                id: response.data,
                ...user
            }
        });
        dispatch({type: 'USER_REGISTER_FULFILLED'});
    } catch (error) {
        console.log(error);
        dispatch({ type: 'USER_REGISTER_ERROR' });
    }
};