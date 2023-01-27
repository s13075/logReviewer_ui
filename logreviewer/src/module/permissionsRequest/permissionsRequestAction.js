import{
    PERMISSIONS_REQUEST_FETCHED,
    PERMISSIONS_REQUEST_PENDING,
    PERMISSIONS_REQUEST_FULFILLED,
    PERMISSIONS_REQUEST_ERROR
} from '../actionTypes';
import { getApplicationPermissionsRequestService } from '../services';

export const getPermissionsRequestListAction = (applicationId) => async (dispatch) => {
  try {

    console.log(PERMISSIONS_REQUEST_PENDING);
    dispatch({type: PERMISSIONS_REQUEST_PENDING});
    const response = await getApplicationPermissionsRequestService(applicationId);
     dispatch({
        type: PERMISSIONS_REQUEST_FETCHED,
        payload: response.data,
    })
    dispatch({type: PERMISSIONS_REQUEST_FULFILLED})
} catch (error) {

    dispatch({ type: PERMISSIONS_REQUEST_ERROR });
}
};
