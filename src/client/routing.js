import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Login,
  NotFound
} from './containers';

const paths = {
  HOME: '/',
  NOT_FOUND: '*',
};

const openPaths = [ // eslint-disable-line
  paths.HOME,
  paths.NOT_FOUND,
];

const userAccess = []; // eslint-disable-line

const adminAccess = []; // eslint-disable-line

export default ({ store }) => {
  console.log(store);
  const performAcdCheck = (nextState, replace) => {
    console.log(replace);
    const [, nextRoute] = nextState.routes;
    const currentPath = nextState.location.pathname;
    if (adminAccess.includes(nextRoute.path)) {
      console.log(currentPath);
    } else if (userAccess.includes(nextRoute.path)) {
      console.log(currentPath);
    } else if (openPaths.includes(nextRoute.path)) {
      console.log(currentPath);
    }
  };

  return (
    <Route path={paths.HOME} component={App}>
      <IndexRoute component={Login} onEnter={performAcdCheck} />
      <Route path={paths.NOT_FOUND} component={NotFound} onEnter={performAcdCheck} />
    </Route>
  );
};
