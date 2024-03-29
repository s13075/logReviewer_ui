export const INITIAL_REVIEWED_APPLICATIONS_REDUCER_STATE = {
    reviewedApplications: [],
    promise:{
        isPending: false,
        isFulfilled: false,
        isErrorOcurred: false
    },
    selectedApplication: null
}


const reviewedApplicationReducer = (state = INITIAL_REVIEWED_APPLICATIONS_REDUCER_STATE, action) =>{
    switch(action.type) {
        case 'REVEIWEDAPPLICATIONSELECTED' :{
            return {
                ...state,
                selectedApplication: action.payload,
            }
        }
        case 'REVEIWEDAPPLICATIONSLIST' :{
            return {
                ...state,
                reviewedApplications: action.payload,
            }
        }
        case 'REVEIWEDAPPLICATIONSBYNAMELIST':{
            return {
                ...state,
                reviewedApplications: action.payload,

            }
        }
        case 'REVEIWEDAPPLICATIONSLISTPENDING':{
            return {
                ...state,
                promise: {isPending: true, isFulfilled: false, isErrorOcurred: false}

            }
        }
        case 'REVEIWEDAPPLICATIONSLISTERROR':{
            return {
                ...state,
                promise: {isPending: false, isFulfilled: false, isErrorOcurred: true}

            }
        }
        case 'REVEIWEDAPPLICATIONSLISTFULFILLED':{
            return {
                ...state,
                promise: {isPending: false, isFulfilled: true, isErrorOcurred: false}

            }
        }
        default: {
            return state;
        }
    }
}

export default reviewedApplicationReducer;