import {combineReducers} from 'redux';
import AuthReducer from "./auth-reducer";
import DonorReducer from "./donor-reducer";

const allReducers = combineReducers({
	auth: AuthReducer,
	donor:DonorReducer
});

export default allReducers;