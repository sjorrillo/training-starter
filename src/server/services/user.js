import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';

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

export const jwtLogin = (user, password) => {
  var pwd = password;
  var email = user;

  //Esta linea de codigo es para encryptar el password
  const encryptedPassword = bcrypt.hashSync(password);
  console.log(encryptedPassword);

  if (user == 'admin' && pwd == 'admin') {
    var token = jwt.sign({ id: user }, config.secret, {
      expiresIn: 120
    });
    return { 
      auth: true, 
      token: token
    };    
  } else {
    return { 
      auth: false,
      message: "Usuario no existe."
    };   
  }
}