import{
    PERMISSIONS_CHANGE_FETCHED,
    PERMISSIONS_CHANGE_PENDING,
    PERMISSIONS_CHANGE_FULFILLED,
    PERMISSIONS_CHANGE_ERROR
} from '../actionTypes';
import { getAllPermissionsChangeService } from '../services';

export const getPermissionsChangeListAction = () => async (dispatch) => {
  try {
    dispatch({type: PERMISSIONS_CHANGE_PENDING});
    const response = await getAllPermissionsChangeService();
    dispatch({
        type: PERMISSIONS_CHANGE_FETCHED,
        payload: response.data,
    })
    dispatch({type: PERMISSIONS_CHANGE_FULFILLED})
} catch (error) {

    dispatch({ type: PERMISSIONS_CHANGE_ERROR });
}
};
