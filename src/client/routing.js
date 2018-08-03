import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  Home,
  NotFound,
  Profile
} from './containers';

const paths = {
  HOME: '/',
  PROFILE: '/profile',
  NOT_FOUND: '*',
};

const openPaths = [
  paths.HOME,
  paths.NOT_FOUND,
];

const userAccess = [
  paths.PROFILE,
];

export default ({ store }) => {
  const performAcdCheck = (nextState, replace) => {
    const [, nextRoute] = nextState.routes;
    const currentPath = nextState.location.pathname;
    if (userAccess.includes(nextRoute.path)) {
      // replace(paths.HOME)
    }
  };

  return (
    <Route path={paths.HOME} component={App}>
      <IndexRoute component={Home} onEnter={performAcdCheck} />
      <Route path={paths.PROFILE} component={Profile} onEnter={performAcdCheck} />
      <Route path={paths.NOT_FOUND} component={NotFound} onEnter={performAcdCheck} />
    </Route>
  );
};
