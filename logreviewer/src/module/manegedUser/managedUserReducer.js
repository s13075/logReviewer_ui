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

export const MANAGED_USER_INITIAL_STATE = {
    user: null,
    usersList: [],
    userPromise:{
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    },
    userListPromise:{
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    },
    registerPromise:{
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    }  
};

const managedUserReducer = (state = MANAGED_USER_INITIAL_STATE, action) => {
    
    switch(action.type){
        case GET_USER:{
            return{
                ...state,
                user: action.payload,
            };
        }
        case REGISTER_USER:{
            return{
                ...state,
            };
        }
        case GET_USER_LIST: {
            return{
                ...state,
                usersList: action.payload,
            };
        }
        case GET_USER_PENDING:{
            return {
                ...state,
                userPromise: {isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case GET_USER_ERROR:{
            return {
                ...state,
                userPromise: {isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case GET_USER_FULFILLED:{
            return {
                ...state,
                userPromise: {isPending: false, isFulfilled: true, isErrorOcurred: false}

            }
        }
        case REGISTER_USER_PENDING:{
            return {
                ...state,
                registerPromise: {isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case REGISTER_USER_ERROR:{
            return {
                ...state,
                registerPromise: {isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case REGISTER_USER_FULFILLED:{
            return {
                ...state,
                registerPromise: {isPending: false, isFulfilled: true, isErrorOcurred: false}

            }
        }
        case GET_USER_LIST_PENDING:{
            return {
                ...state,
                userListPromise: {isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case GET_USER_LIST_ERROR:{
            return {
                ...state,
                userListPromise: {isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case GET_USER_LIST_FULFILLED:{
            return {
                ...state,
                userListPromise: {isPending: false, isFulfilled: true, isErrorOcurred: false}

            }
        }
        default: {
            return state;
        }
    }
};

export default managedUserReducer;