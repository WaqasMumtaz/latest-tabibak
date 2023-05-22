import { combineReducers } from 'redux';
import changeLanguage from './reducersActions/changeLanguage';
import userReducer from './reducersActions/userReducer';
import updateAppointments from './reducersActions/updateAppointments';


export default combineReducers({
    changeLanguage,
    userReducer,
    updateAppointments
})