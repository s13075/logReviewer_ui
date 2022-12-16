export const USER_INITIAL_STATE = {
    token: '',
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
        default: {
            return state;
        }
    }

    return

}

export default userReducer;