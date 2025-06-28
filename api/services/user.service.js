import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { sequelize } from '../lib/sequelize.js';

class UserService {
  constructor() {}

  async find() {
    const client = sequelize.models.User.findAll();
    return client;
  }

  async findByEmail(email) {
    const client = sequelize.models.User.findOne({
      where: {
        email,
      },
    });
    return client;
  }

  async create(data) {
    console.log(data);
    const hash = await bcrypt.hash(data.password, 10);
    console.log(hash);
    const newUser = await sequelize.models.User.create({
      ...data,
      password: hash,
    });
    console.log(newUser);
    delete newUser.dataValues.password;
    return newUser;
  }

  async findOne(id) {
    const user = await sequelize.models.User.findByPk(id, {
      include: ['subscriptionPlan'],
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
export default UserService;
