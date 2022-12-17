export const USER_INITIAL_STATE = {
    token: window.localStorage.getItem('logreviewer-token'),
    promise:{
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    },
};

const userReducer = (state = USER_INITIAL_STATE, action) => {
    // return new state when login dispatch
    switch(action.type){
        case 'USER_LOGIN':{
            return{
                ...state,
                token: action.payload.token,
            };
        }
        case 'USER_LOGIN_PENDING':{
            return {
                ...state,
                promise: {isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case 'USER_LOGIN_ERROR':{
            return {
                ...state,
                promise: {isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case 'USER_LOGIN_FULFILLED':{
            return {
                ...state,
                promise: {isPending: false, isFulfilled: true, isErrorOcurred: false}

            }
        }
        default: {
            return state;
        }
    }
};

export default userReducer;