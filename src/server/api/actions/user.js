import { getDefaultUser, signIn, jwtLogin } from '../../services/user';
import { httperrors } from 'http-errors';

export const getUser = (req, res) => {
  const result = getDefaultUser();
  return res.json(result);
};

export const login = (req, res) => {
  const { user, password } = req.body;
  const result = signIn(req, user, password);
  return res.json(result);
};

export const secureLogin = (req, res) => {
  const {user, password} = req.body;
  const result = jwtLogin(req, user, password);
  if (!result.auth) {
    return res.status(404).send(result);
  }
  return res.json(result);
}