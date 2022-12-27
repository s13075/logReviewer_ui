import {combineReducers} from 'redux';
import reviewedApplicationReducer from './reviewedApplication/reviewedApplicationReducer';
import userReducer from './user/userReducer';
import menuOptionsReducer from './menuOptions/menuOptionsReducer';
import managedUserReducer from './manegedUser/managedUserReducer';

export default combineReducers({
    reviewedApplicationReducer,
    user: userReducer,
    menuOptionsReducer,
    managedUser: managedUserReducer,
});