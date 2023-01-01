import React from 'react';
import{
    PERMISSIONS_CHANGE_FETCHED,
    PERMISSIONS_CHANGE_PENDING,
    PERMISSIONS_CHANGE_FULFILLED,
    PERMISSIONS_CHANGE_ERROR
} from '../actionTypes';
import { getAllPermissionsChangeService } from '../services';

export const getPermissionsChangeListAction = () => async (dispatch) => {
  try {

    console.log(PERMISSIONS_CHANGE_PENDING);
    dispatch({type: PERMISSIONS_CHANGE_PENDING});
    const response = await getAllPermissionsChangeService();
   // window.localStorage.setItem('logreviewer-token', response.data.token);
   console.log(response);
    dispatch({
        type: PERMISSIONS_CHANGE_FETCHED,
        payload: response.data,
    })
    dispatch({type: PERMISSIONS_CHANGE_FULFILLED})
} catch (error) {

    dispatch({ type: PERMISSIONS_CHANGE_ERROR });
}
};
