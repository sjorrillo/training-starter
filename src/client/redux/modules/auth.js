const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const initialstate = {};

export default (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.result,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const login = (user, password) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: client => client.post('/account/login', { data: { user, password } }),
});

// request using the requestFactory to control all the flow of the request.
export const loginCustomDispacher = (user, password) => async (makeRequest, dispatch, getState) => {
  dispatch({ type: LOGIN });

  const { result, error } = await makeRequest({
    method: 'POST',
    url: '/account/login',
    data: { user, password },
  });

  const { authStore } = getState();
  console.log({
    state: getState(),
    auth: authStore,
    result,
    error,
  });

  if (error) {
    dispatch({ type: LOGIN_FAIL, error });
    return;
  }

  dispatch({ type: LOGIN_SUCCESS, result });
};
