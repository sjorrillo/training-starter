
export const SESSION_STORAGE = 'starter-auth';

let loggingOut = false;
export const isLoggingOut = () => !!loggingOut;

export const logout = () => {
  loggingOut = true;
  localStorage.removeItem(SESSION_STORAGE);
  location.reload();
};
