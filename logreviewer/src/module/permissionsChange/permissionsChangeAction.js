import { useSelector } from 'react-redux';
import{
    PERMISSIONS_CHANGE_FETCHED,
    PERMISSIONS_CHANGE_PENDING,
    PERMISSIONS_CHANGE_FULFILLED,
    PERMISSIONS_CHANGE_ERROR,
    PERMISSIONS_CHANGE_REMOVE,
    PERMISSIONS_CHANGE_READD
} from '../actionTypes';

import { getApplicationPermissionsChangeService } from '../services';

export const getPermissionsChangeListAction = (applicationId) => async (dispatch) => {
  try {
    dispatch({type: PERMISSIONS_CHANGE_PENDING});
    const response = await getApplicationPermissionsChangeService(applicationId);
    dispatch({
        type: PERMISSIONS_CHANGE_FETCHED,
        payload: response.data,
    })
    dispatch({type: PERMISSIONS_CHANGE_FULFILLED})
} catch (error) {

    dispatch({ type: PERMISSIONS_CHANGE_ERROR });
}
};
export const removePermisionsChangeFromList = (permisionsChange) => async (dispatch) =>{

    dispatch({
        type: PERMISSIONS_CHANGE_REMOVE,
        payload: permisionsChange,
    
    })
}

export const readdPermisionsChangeToList = (permisionsChange) => async (dispatch) =>{

    permisionsChange.map(change => {
        dispatch({
            type: PERMISSIONS_CHANGE_READD,
            payload: change
        })
    }
    )
}
