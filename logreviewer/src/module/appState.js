import { configureStore } from '@reduxjs/toolkit';

import reviewedApplicationReducer from './reviewedApplication/reviewedApplicationReducer';
import userReducer from './user/userReducer';
import menuOptionsReducer from './menuOptions/menuOptionsReducer';
import managedUserReducer from './manegedUser/managedUserReducer';
import permissionsChangeReducer from './permissionsChange/permissionsChangeReducer';
import permissionsRequestReducer from './permissionsRequest/permissionsRequestReducer';
import reconciliationReducer from '../module/reconciliation/reconciliationSlice';

import React from 'react'

const appState = configureStore({
  reducer: {
    reviewedApplicationReducer,
    user: userReducer,
    menuOptionsReducer,
    managedUser: managedUserReducer,
    permissionsChange: permissionsChangeReducer,
    permissionsRequest: permissionsRequestReducer,
    reconciliation: reconciliationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default appState