import {combineReducers} from 'redux';
import reviewedApplicationReducer from './reviewedApplication/reviewedApplicationReducer';
import userReducer from './user/userReducer';

export default combineReducers({
    reviewedApplicationReducer,
    user: userReducer,
});