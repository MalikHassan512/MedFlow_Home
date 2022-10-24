// Reducer

import {combineReducers} from 'redux';

import authReducer from './auth';

const appReducer = combineReducers({
  auth: authReducer,
});

const reducer = (state, action) => {
  return appReducer(state, action);
};

export default reducer;
