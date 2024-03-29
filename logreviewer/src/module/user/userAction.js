import { login, register } from "./userService";

export const loginAction = (email, password) => async (dispatch) => {
     
    try {
        dispatch({type: 'USER_LOGIN_PENDING'});
        const response = await login(email, password);
       // window.localStorage.setItem('logreviewer-token', response.data.token);
        dispatch({
            type: 'USER_LOGIN',
            payload: response.data,
        })
        dispatch({
            type: 'USER_LOGIN2',
            payload: response.data,
        })
        dispatch({type: 'SHOW_MENU_OPTIONS'})
        dispatch({type: 'USER_LOGIN_FULFILLED'});
        
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

export const logoutAction = () => async (dispatch) =>{
    ;
    try{
        
        dispatch({type: 'USER_LOGOUT'});

    }  catch (error) {
        console.log(error);
    }
};