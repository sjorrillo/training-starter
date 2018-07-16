import { jwt } from 'jsonwebtoken';
import { bcrypt} from 'bcryptjs';
import { config } from '../config/config';
import UserDao from '../mongo/UserDao';


export const getDefaultUser = () => ({
  user: 'javier',
  name: 'javier Orrillo',
});

export const signIn = (ctx, user, password) => {
  console.log('Input Data', { user, password });
  return {
    user,
    name: `UserName for user: - ${user}`,
    password, // only for testing purposes
  };
};

export const jwtLogin = (req, user, password) => {
  var pwd = password;
  var email = user;
  console.log(email);
  UserDao.findOne({
    email: email
  })
  .then(data => {
    console.log(data);
    if (!data) return data;

    var isValidPwd = bcrypt.compareSync(password, data.password);
      if (!isValidPwd) return 
      {
       message: 'Password entered is wrong.'
      };

    var token = jwt.sign({ id: data._id }, config.secret, {
      expiresIn: authTtl
    });

    return { 
      auth: true, 
      token: token
    };

  }).catch((err) => {
    console.log(err);
    console.log('error in catch.');
  });
}