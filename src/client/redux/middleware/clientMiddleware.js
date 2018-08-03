const getCommonHeaders = () => ({
  'X-Request-Id': 'Test request id',
});

export const requestFactory = (dispatch, getState, client) => async ({
  method, url, data, params,
}) => {
  const request = client[method.toLowerCase()];
  let response;
  try {
    const headers = getCommonHeaders();
    const result = await request(url, { headers, data, params });
    response = { result };
  } catch (error) {
    response = { error };
  }
  return response;
};

export const clientMiddleware = client => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(requestFactory(dispatch, getState, client), dispatch, getState);
  }

  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({
    ...rest,
    type: REQUEST,
  });

  const headers = getCommonHeaders();
  client.setExtraHeaders(headers);

  const actionPromise = promise(client);
  actionPromise.then(
    result => next({ ...rest, result, type: SUCCESS }),
    error => next({ ...rest, error, type: FAILURE })
  ).catch(error => {
    console.error('MIDDLEWARE ERROR:', error);
    next({ ...rest, error, type: FAILURE });
  });

  return actionPromise;
};
