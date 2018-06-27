import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authStore from './auth';

export default combineReducers({
  routing: routerReducer,
  authStore,
});
