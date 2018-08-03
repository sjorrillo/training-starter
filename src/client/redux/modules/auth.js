const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const RESTORE_STATE = 'auth/RESTORE_STATE';
const LOGOUT = 'auth/LOGOUT';

const initialstate = {};

export default (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        loggingOut: false,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        loggingOut: false,
        loginError: null,
        ...action.result,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        loggingOut: false,
        loginError: action.error,
        user: null,
      };
    case RESTORE_STATE:
      return {
        ...state,
        ...action.state,
        loggingIn: false,
        loggingOut: false,
        loginError: null,
      };
    case LOGOUT:
      return {
        ...state,
        ...action.state,
        loggingIn: false,
        loggedIn: false,
        loggingOut: true,
      };
    default:
      return state;
  }
};

export const login = (user, password) => async (makeRequest, dispatch) => {
  dispatch({ type: LOGIN });

  const { result, error } = await makeRequest({
    method: 'POST',
    url: '/account/login',
    data: { user, password },
  });

  if (error) {
    dispatch({ type: LOGIN_FAIL, error });
    return;
  }

  dispatch({ type: LOGIN_SUCCESS, result });
};

export const restoreState = (state = {}) => (makeRequest, dispatch) => {
  dispatch({ type: RESTORE_STATE, state });
};

export const logout = () => (makeRequest, dispatch) => {
  dispatch({ type: LOGOUT, state: initialstate });
};
