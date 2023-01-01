import {combineReducers} from 'redux';
import reviewedApplicationReducer from './reviewedApplication/reviewedApplicationReducer';
import userReducer from './user/userReducer';
import menuOptionsReducer from './menuOptions/menuOptionsReducer';
import managedUserReducer from './manegedUser/managedUserReducer';
import permissionsChangeReducer from './permissionsChange/permissionsChangeReducer';
import permissionsRequestReducer from './permissionsRequest/permissionsRequestReducer';


export default combineReducers({
    reviewedApplicationReducer,
    user: userReducer,
    menuOptionsReducer,
    managedUser: managedUserReducer,
    permissionsChange: permissionsChangeReducer,
    permissionsRequest: permissionsRequestReducer,
});