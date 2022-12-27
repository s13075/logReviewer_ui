import { registerUserService , listUsersService, selectUserService } from "../services";
import { useDispatch} from 'react-redux';
import {
    REGISTER_USER,
    REGISTER_USER_PENDING,
    REGISTER_USER_FULFILLED,
    REGISTER_USER_ERROR,
    GET_USER,
    GET_USER_PENDING,
    GET_USER_FULFILLED,
    GET_USER_ERROR,
    GET_USER_LIST,
    GET_USER_LIST_PENDING,
    GET_USER_LIST_FULFILLED,
    GET_USER_LIST_ERROR    
} from '../actionTypes';


export const registerUser = (user) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_PENDING});
        const response = await registerUserService(user);
         dispatch({
            type: REGISTER_USER,
            payload: {
                id: response.data,
                ...user
            }
        });
        dispatch({type: REGISTER_USER_FULFILLED});
    } catch (error) {
        console.log(error);
        dispatch({ type: REGISTER_USER_ERROR });
    }
};

export const selectUser = (userId) => async (dispatch) => {
    try {
        dispatch({type: GET_USER_PENDING});
        const response = await selectUserService(userId);
         dispatch({
            type: GET_USER,
            payload: response.data,
 
        });
        dispatch({type: GET_USER_FULFILLED});
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_ERROR});
    }
};

export const getUserList = () => async (dispatch) => {
    try {
        dispatch({type: GET_USER_LIST_PENDING});
        const response = await listUsersService();
         dispatch({
            type: GET_USER_LIST,
            payload: response.data,
        });
        dispatch({type: GET_USER_LIST_FULFILLED});
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_LIST_ERROR });
    }
};