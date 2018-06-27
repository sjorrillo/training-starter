import { createStore as _createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { clientMiddleware as createMiddleware } from './middleware/clientMiddleware';
import reducer from './modules/reducer';

export default function createStore(client, routingMiddleware, data) {
  const middleware = [createMiddleware(client), routingMiddleware, thunk];

  const storeCreator = applyMiddleware(...middleware)(_createStore);

  const store = storeCreator(reducer, data);
  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer')); // eslint-disable-line
    });
  }

  return store;
}
