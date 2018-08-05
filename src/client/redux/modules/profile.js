const PRIVATE_REQUEST = 'auth/PRIVATE_REQUEST';
const PRIVATE_REQUEST_SUCCESS = 'auth/PRIVATE_REQUEST_SUCCESS';
const PRIVATE_REQUEST_FAIL = 'auth/PRIVATE_REQUEST_FAIL';

const initialstate = {};

export default (state = initialstate, action) => {
  switch (action.type) {
    case PRIVATE_REQUEST:
      return state;
    case PRIVATE_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.result,
      };
    case PRIVATE_REQUEST_FAIL:
      return state;
    default:
      return state;
  }
};

export const testPrivateRequest = () => ({
  types: [PRIVATE_REQUEST, PRIVATE_REQUEST_SUCCESS, PRIVATE_REQUEST_FAIL],
  promise: client => client.put('/account/profile'),
});
