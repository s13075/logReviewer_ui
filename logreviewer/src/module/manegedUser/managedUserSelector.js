import { createSelector } from 'reselect';

export const getManagedUserSelector = (rootReducer) => rootReducer.managedUser.user;

export const getManagedUserListSelector = (rootReducer) => rootReducer.managedUser.usersList;

export const getManagedUserPromiseSelector  = (rootReducer) => rootReducer.managedUser.userPromise;

export const getManagedUserEditPromiseSelector = (rootReducer) => rootReducer.managedUser.editPromise;

export const getManagedUserListPromiseSelector = (rootReducer) => rootReducer.managedUser.userListPromise;

export const getManagedUserRegisterPromiseSelector = (rootReducer) => rootReducer.managedUser.registerPromise;

export const hasManagedUserSelector = createSelector(
    [getManagedUserSelector],
    (user) => user ? true : false
);

export const getManagedUserRolesSelector = createSelector(
    [getManagedUserSelector],
    (user) => user ? user.roles.map(role => role.roleName) : []
);

export const insertsSelectedSelector = createSelector(
    [getManagedUserEditPromiseSelector, getManagedUserRegisterPromiseSelector],
    (managedUserEditPromise, managedUserRegisterPromise) =>
      managedUserEditPromise.isSelected || managedUserRegisterPromise.isSelected
  );








