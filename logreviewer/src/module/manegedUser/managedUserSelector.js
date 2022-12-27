
export const getManagedUserSelector = (rootReducer) => rootReducer.managedUser.user;

export const getManagedUserListSelector = (rootReducer) => rootReducer.managedUser.usersList;

export const getManagedUserPromiseSelector  = (rootReducer) => rootReducer.managedUser.userPromise;

export const getManagedUserListPromiseSelector = (rootReducer) => rootReducer.managedUser.userListPromise;

export const getManagedUserRegisterPromiseSelector = (rootReducer) => rootReducer.managedUser.registerPromise;