import { createSelector } from 'reselect';

export const getUserTokenSelector = (rootReducer) => rootReducer.user.token;

export const getUserPromiseSelector = (rootReducer) => rootReducer.user.promise;

export const getUserRegisterPromiseSelector  = (rootReducer) => rootReducer.user.registerPromise;

export const getUserObjectSelector = (rootReducer) => rootReducer.user.user;

export const getUserRolesSelector = createSelector(
    [getUserObjectSelector],
    (user)=> user ? user.roles : []
);
