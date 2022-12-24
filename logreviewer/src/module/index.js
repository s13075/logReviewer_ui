import {combineReducers} from 'redux';
import reviewedApplicationReducer from './reviewedApplication/reviewedApplicationReducer';
import userReducer from './user/userReducer';
import menuOptionsReducer from './menuOptions/menuOptionsReducer';

export default combineReducers({
    reviewedApplicationReducer,
    user: userReducer,
    menuOptionsReducer,
});