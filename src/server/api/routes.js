import * as actions from './actions';
import { verifyToken } from './middleware/TokenInterceptor';

export const configureRoutes = router => {
  router.post('/account/secure/login', actions.secureLogin);

  router.get('/receipt', verifyToken, actions.getReceipts);
};