import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { logout, restoreState } from '../modules/auth';
import { requestFactory } from './clientMiddleware';
import globals from '../../../common/globals';
import { isLoggingOut, SESSION_STORAGE } from '../../helpers/auth-helper';

const shouldLogout = (currentSession, prevSession) => currentSession.loggingOut || (prevSession && !prevSession.user && !prevSession.token);

const shouldSaveSession = (currentSession, prevSession) => !prevSession || currentSession.loggedIn || currentSession.loggingOut;

const getSessionFromStore = getState => pick(getState().authStore, ['user', 'token', 'loggedIn', 'loggingOut']);

let sessionHydrated = false;
let logoutDispatched = false;
const readSession = (getState, dispatch) => {
  const currentSession = getSessionFromStore(getState);
  const sessionLoaded = JSON.parse(globals.localStorage.getItem(SESSION_STORAGE));
  if (!logoutDispatched && shouldLogout(currentSession, sessionLoaded)) {
    logoutDispatched = true;
    dispatch(logout());
  }

  if (!sessionHydrated) {
    sessionHydrated = true;
    !isEqual(currentSession, sessionLoaded) && dispatch(restoreState(sessionLoaded));
  }
  return sessionLoaded;
};

const saveSession = (getState, prevSession) => {
  if (isLoggingOut()) return;

  const currentSession = getSessionFromStore(getState);
  if (isEqual(currentSession, prevSession)) return;

  if (!shouldSaveSession(currentSession, prevSession)) return;

  globals.localStorage.setItem(SESSION_STORAGE, JSON.stringify(currentSession));
};

export const sessionMiddleware = client => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(requestFactory(dispatch, getState, client), dispatch, getState);
  }
  const sessionLoaded = readSession(getState, dispatch);
  const result = next(action);
  saveSession(getState, sessionLoaded);
  return result;
};
