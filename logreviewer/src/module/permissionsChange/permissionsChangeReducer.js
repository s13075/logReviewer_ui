import{
    PERMISSIONS_CHANGE_FETCHED,
    PERMISSIONS_CHANGE_PENDING,
    PERMISSIONS_CHANGE_FULFILLED,
    PERMISSIONS_CHANGE_ERROR,
    PERMISSIONS_CHANGE_REMOVE,
    PERMISSIONS_CHANGE_READD
} from '../actionTypes';

export const PERMISSIONS_CHANGE_INITIAL_STATE= {

    permissionsChangeList: [],
    listPromise: {
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    }
};


const permissionsChangeReducer = (state = PERMISSIONS_CHANGE_INITIAL_STATE, action) => {
    switch(action.type){
        case PERMISSIONS_CHANGE_FETCHED:{
            return{
                ...state,
                permissionsChangeList: action.payload,
            }
        }
        case PERMISSIONS_CHANGE_PENDING:{
            return {
                ...state,
                listPromise: {isPending: true, isFulfilled: false, isErrorOcurred: false}
            }
        }
        case PERMISSIONS_CHANGE_FULFILLED:{
            return {
                ...state,
                listPromise: {isPending: false, isFulfilled: true, isErrorOcurred: false}
            }
        }
        case PERMISSIONS_CHANGE_REMOVE:{
            return {
                ...state,
                permissionsChangeList: state.permissionsChangeList.filter((change) => change.id !== action.payload.id)
            }
        }
        case PERMISSIONS_CHANGE_READD:{

            return {
                ...state,
                permissionsChangeList: state.permissionsChangeList.concat(action.payload)
            }
        }
        case PERMISSIONS_CHANGE_ERROR:{
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

export default permissionsChangeReducer;