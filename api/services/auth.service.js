import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './../config/config.js';
import UserServices from './user.service.js';

const service = new UserServices();

class AuthServices {
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    console.log(user);
    const payload = {
      sub: user.userId,
      role: user.role,
    };
    console.log(payload);
    console.log(config.jwtSecret);
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      token,
    };
  }
}

export default AuthServices;
