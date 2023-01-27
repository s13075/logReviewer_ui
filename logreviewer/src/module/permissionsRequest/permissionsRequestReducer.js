import{
    PERMISSIONS_REQUEST_FETCHED,
    PERMISSIONS_REQUEST_PENDING,
    PERMISSIONS_REQUEST_FULFILLED,
    PERMISSIONS_REQUEST_ERROR
} from '../actionTypes';

export const PERMISSIONS_REQUEST_INITIAL_STATE= {

    permissionsRequestList: [],
    listPromise: {
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    }
};


const permissionsRequestReducer = (state = PERMISSIONS_REQUEST_INITIAL_STATE, action) => {
    switch(action.type){
        case PERMISSIONS_REQUEST_FETCHED:{
            return{
                ...state,
                permissionsRequestList: action.payload,
            };
        }
        case PERMISSIONS_REQUEST_PENDING:{
            return {
                ...state,
                listPromise: {isPending: true, isFulfilled: false, isErrorOcurred: false}
            }
        }
        case PERMISSIONS_REQUEST_FULFILLED:{
            return {
                ...state,
                listPromise: {isPending: false, isFulfilled: true, isErrorOcurred: false}
            }
        }
        case PERMISSIONS_REQUEST_ERROR:{
            return {
                ...state,
                listPromise: {isPending: false, isFulfilled: false, isErrorOcurred: true}
            }
        }
        default:{
            return state;
        }
    }
};

export default permissionsRequestReducer;