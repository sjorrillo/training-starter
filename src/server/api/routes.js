import * as actions from './actions';

export const configureRoutes = router => {
  router.route('/account/user')
    .get(actions.getUser);

  router.route('/account/login')
    .post(actions.login);

  router.route('/account/v2/login')
    .post(actions.secureLogin);``

  router.route('/receipt')
    .get(actions.getReceipts);
};