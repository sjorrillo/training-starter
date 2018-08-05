import { getDefaultUser, signIn } from '../../services/user';

export const getUser = (req, res) => {
  const result = getDefaultUser();
  return res.json(result);
};

export const login = (req, res) => {
  const { user, password } = req.body;
  const result = signIn(req, user, password);
  return res.json(result);
};

export const updateProfile = (req, res) => {
  console.log('Update profile');
  return res.json({ name: 'javier' });
};
