import { configureStore } from '@reduxjs/toolkit';
import reviewedApplicationReducer from './reviewedApplication/reviewedApplicationReducer';
import userReducer from './user/userReducer';
import managedUserReducer from './manegedUser/managedUserReducer';
import permissionsChangeReducer from './permissionsChange/permissionsChangeReducer';
import permissionsRequestReducer from './permissionsRequest/permissionsRequestReducer';
import reconciliationReducer from './reconciliation/reconciliationSlice';
import justificationReducer from './justification/justificationSlice';

const appState = configureStore({
  reducer: {
    reviewedApplicationReducer,
    user: userReducer,
    managedUser: managedUserReducer,
    permissionsChange: permissionsChangeReducer,
    permissionsRequest: permissionsRequestReducer,
    reconciliation: reconciliationReducer,
    justification: justificationReducer,
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default appState