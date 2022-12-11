import {getReviewedApplicationService, getReviewedApplicationByNameService} from './reviewedApplicationService';

export const getReviewedApplicationAction =() => async (dispatch) => {
    try{
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTPENDING'});
        const reviewedApplications = await getReviewedApplicationService();
        dispatch({
            type: 'REVEIWEDAPPLICATIONSLIST',
            payload: reviewedApplications.data,
        })
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTFULFILLED'});

    }catch(error){
        console.log(error);
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTERROR'});
    }
}

export const getReviewedApplicationByNameAction = (applicationName) => async (dispatch) => {
    try{
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTPENDING'});
        console.log('called REVEIWEDAPPLICATIONSLIST');
        const reviewedApplications = await getReviewedApplicationByNameService(applicationName);
        console.log(reviewedApplications);
        dispatch({
            type: 'REVEIWEDAPPLICATIONSBYNAMELIST',
            payload: reviewedApplications.data,
        })
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTFULFILLED'});

    }catch(error){
        console.log(error);
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTERROR'});
    }
}
