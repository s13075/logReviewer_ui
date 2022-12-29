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
    EDIT_USER_SAVE,
    EDIT_USER_UN_SELECTED,
    EDIT_USER_SELECTED,
    EDIT_USER_PENDING,
    EDIT_USER_FULFILLED,
    EDIT_USER_ERROR,
    CLEAR_USER,
    EDIT_USER_LOCAL_ROLES
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
        isSelected: false,
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    },
    editPromise:{
        isSelected: false,
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
                user: action.payload,
            };
        }
        case CLEAR_USER:{
            return{
                ...state,
                user: action.payload,
            };
        }
        case EDIT_USER:{
            return{
                ...state,
                user: action.payload,             
            };
        }
        case EDIT_USER_LOCAL_ROLES:{
            return{
                ...state,
                user: {...state.user,
                    roles: action.payload,
                }     
            };
        }
        case EDIT_USER_SAVE:{
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
        case REGISTER_USER_SELECTED:{
            return {
                ...state,
                registerPromise: {isSelected: true, isPending: false, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case REGISTER_USER_UN_SELECTED:{
            return {
                ...state,
                registerPromise: {isSelected: false, isPending: false, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case REGISTER_USER_PENDING:{
            return {
                ...state,
                registerPromise: {isSelected: false, isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case REGISTER_USER_ERROR:{
            return {
                ...state,
                registerPromise: {isSelected: false, isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case REGISTER_USER_FULFILLED:{
            return {
                ...state,
                registerPromise: {isSelected: false, isPending: false, isFulfilled: true, isErrorOcurred: false}

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
        case EDIT_USER_SELECTED:{
            return {
                ...state,
                editPromise: {isSelected: true, isPending: false, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case EDIT_USER_UN_SELECTED:{
            return {
                ...state,
                editPromise: {isSelected: false, isPending: false, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case EDIT_USER_PENDING:{
            return {
                ...state,
                editPromise: {isSelected: false, isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case EDIT_USER_ERROR:{
            return {
                ...state,
                editPromise: {isSelected: false, isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case EDIT_USER_FULFILLED:{
            return {
                ...state,
                registerPromise: {isSelected: false, isPending: false, isFulfilled: true, isErrorOcurred: false}

            }
        }
        default: {
            return state;
        }
    }
};

export default managedUserReducer;