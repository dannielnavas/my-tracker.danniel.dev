import { Strategy } from 'passport-local';
import AuthServices from './../../../services/auth.service.js';

const service = new AuthServices();

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

export default localStrategy;
