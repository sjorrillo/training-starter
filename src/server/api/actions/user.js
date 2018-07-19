import { getDefaultUser, signIn, jwtLogin } from '../../services/user';

export const secureLogin = (req, res) => {
  const {user, password} = req.body;
  const result = jwtLogin(user, password);
  if (!result.auth) {
    return res.status(404).send(result);
  }
  return res.json(result);
}