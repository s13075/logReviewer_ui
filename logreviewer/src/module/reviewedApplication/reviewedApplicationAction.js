import getReviewedApplicationService from './reviewedApplicationService';

const getReviewedApplicationAction =() => async (dispatch) => {
    try{
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTPENDING'});
        const reviewedApplications = await getReviewedApplicationService();
        dispatch({
            type: 'REVEIWEDAPPLICATIONSLIST',
            payload: reviewedApplications.data
        })
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTFULFILLED'});

    }catch(error){
        console.log(error);
        dispatch({type: 'REVEIWEDAPPLICATIONSLISTERROR'});
    }
}

export default getReviewedApplicationAction;