import { registerUserService, listUsersService, selectUserService, updateUserService } from "../services";
import { useDispatch } from 'react-redux';
import {
    REGISTER_USER,
    REGISTER_USER_SELECTED,
    REGISTER_USER_UN_SELECTED,
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
    GET_USER_LIST_ERROR,
    EDIT_USER,
    EDIT_USER_SELECTED,
    EDIT_USER_UN_SELECTED,
    EDIT_USER_PENDING,
    EDIT_USER_FULFILLED,
    EDIT_USER_ERROR,
    CLEAR_USER,
    EDIT_USER_LOCAL_ROLES,
    EDIT_USER_SAVE,
} from '../actionTypes';


export const registerUser = (user) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_USER_PENDING });
        const response = await registerUserService(user);
        dispatch({
            type: REGISTER_USER,
            payload: response.data           
        });
        dispatch({ type: REGISTER_USER_FULFILLED });
    } catch (error) {
        console.log(error);
        dispatch({ type: REGISTER_USER_ERROR });
    }
};
export const updateUserRoles = (roles) => async (dispatch) => {
    try {

        dispatch({
            type: EDIT_USER_LOCAL_ROLES,
            payload: roles
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: EDIT_USER_ERROR });
    }
} 

export const updateUser = (emploeeId, user) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_USER_PENDING });
        console.log(user);
        const response = await updateUserService(emploeeId, user);
        console.log(response);
        await dispatch({
            type: EDIT_USER,
            payload: response.data,
            
        });
        dispatch({ type: EDIT_USER_FULFILLED });
    } catch (error) {
        console.log(error);
        dispatch({ type: EDIT_USER_ERROR });
    }
};



export const selectUser = (empoleeId) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_PENDING });
        const response = await selectUserService(empoleeId);
        dispatch({
            type: GET_USER,
            payload: response.data,

        });
        dispatch({ type: GET_USER_FULFILLED });
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_ERROR });
    }
};

export const unSelectUser = () => async (dispatch) => {
    const user = {
        name:'',
        surname:'',
        email:'',
        emploeeId:'XX0000',
        password: '',
        roles: []
    }

    try {

        dispatch({ type: CLEAR_USER,
            payload: user
        
        });

    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_ERROR });
    }
};

export const lockForUserEdit = () => async (dispatch) => {
    try {
        console.log("lockForUserEdit");
        dispatch({ type: EDIT_USER_SELECTED });
    } catch (error) {
        console.log(error);
    }
};

export const unlockForUserEdit = () => async (dispatch) => {
    try {
        dispatch({ type: EDIT_USER_UN_SELECTED });
    } catch (error) {
        console.log(error);
    }
};

export const lockForUserRegister = () => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_SELECTED });
    } catch (error) {
        console.log(error);
    }

};

export const unlockForUserRegister = () => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_UN_SELECTED });
    } catch (error) {
        console.log(error);
    }
};

export const getUserList = () => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_LIST_PENDING });
        const response = await listUsersService();
        dispatch({
            type: GET_USER_LIST,
            payload: response.data,
        });
        dispatch({ type: GET_USER_LIST_FULFILLED });
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_LIST_ERROR });
    }
};