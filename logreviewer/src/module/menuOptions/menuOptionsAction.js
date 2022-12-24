import React from 'react'

export const showOptionsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: 'SHOW_MENU_OPTIONS'
        })

    } catch (error) {
        console.log(error);

    }
};

export const hideOptionsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: 'HIDE_MENU_OPTIONS'
        })

    } catch (error) {
        console.log(error);

    }
};
