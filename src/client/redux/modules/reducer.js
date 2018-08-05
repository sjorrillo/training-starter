import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authStore from './auth';
import profileStore from './profile';

export default combineReducers({
  routing: routerReducer,
  authStore,
  profileStore,
});
