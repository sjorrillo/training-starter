import globals from '../../common/globals';

export const SESSION_STORAGE = 'starter-auth';

let loggingOut = false;
export const isLoggingOut = () => !!loggingOut;

export const logout = () => {
  loggingOut = true;
  globals.localStorage.removeItem(SESSION_STORAGE);
  globals.location.reload();
};
