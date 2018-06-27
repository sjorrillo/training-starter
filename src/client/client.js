import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createStore from './redux/create';
import { client } from './modules/api-client';
import getRoutes from './routing';

const routingMiddleware = routerMiddleware(browserHistory);
const store = createStore(client, routingMiddleware, {});
const history = syncHistoryWithStore(browserHistory, store);
const appContainer = document.getElementById('content');

const appContent = (
  <Router history={ history }>
    { getRoutes(store) }
  </Router>
);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store} key="provider">
      {appContent}
    </Provider>,
    appContainer
  );
};

renderApp();
