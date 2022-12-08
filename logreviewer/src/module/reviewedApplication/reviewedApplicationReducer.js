export const INITIAL_REVIEWED_APPLICATIONS_REDUCER_STATE = {
    reviewedApplications: []
}


const reviewedApplicationReducer = (state = INITIAL_REVIEWED_APPLICATIONS_REDUCER_STATE, action) =>{
    switch(action.type) {
        case 'REVEIWEDAPPLICATIONSLIST' :{
            return{
                ...state,
                reviewedApplications: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default reviewedApplicationReducer;