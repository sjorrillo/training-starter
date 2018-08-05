import * as actions from './actions';

export const configureRoutes = router => {
  router.route('/account/user')
    .get(actions.getUser);

  router.route('/account/login')
    .post(actions.login);

  router.route('/account/profile')
    .put(actions.updateProfile);
};
