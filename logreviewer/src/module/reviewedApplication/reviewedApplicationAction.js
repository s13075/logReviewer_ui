import getReviewedApplicationService from './reviewedApplicationService';

const getReviewedApplicationAction =() => async (dispatch) => {
    try{

        const reviewedApplications = await getReviewedApplicationService();
        dispatch({
            type: 'REVEIWEDAPPLICATIONSLIST',
            payload: reviewedApplications.data
        })

    }catch(error){
        console.log(error);
    }
}

export default getReviewedApplicationAction;