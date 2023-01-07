import React from 'react';
import{
    PERMISSIONS_REQUEST_FETCHED,
    PERMISSIONS_REQUEST_PENDING,
    PERMISSIONS_REQUEST_FULFILLED,
    PERMISSIONS_REQUEST_ERROR
} from '../actionTypes';
import { getAllPermissionsRequestService } from '../services';

export const getPermissionsRequestListAction = () => async (dispatch) => {
  try {

    console.log(PERMISSIONS_REQUEST_PENDING);
    dispatch({type: PERMISSIONS_REQUEST_PENDING});
    const response = await getAllPermissionsRequestService();
     dispatch({
        type: PERMISSIONS_REQUEST_FETCHED,
        payload: response.data,
    })
    dispatch({type: PERMISSIONS_REQUEST_FULFILLED})
} catch (error) {

    dispatch({ type: PERMISSIONS_REQUEST_ERROR });
}
};
