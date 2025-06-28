import { sequelize } from '../lib/sequelize.js';

class TaskService {
  constructor() {}

  async find() {
    const tasks = await sequelize.models.Tasks.findAll();
    return tasks;
  }

  async findAllTasksByUserId(userId) {
    const tasks = await sequelize.models.Tasks.findAll({
      where: {
        user_id: userId,
      },
      include: ['statusTask'],
    });
    return tasks;
  }

  async createTask(task) {
    const newTask = await sequelize.models.Tasks.create(task);
    return newTask;
  }

  async update(id, changes) {
    const task = await sequelize.models.Tasks.findByPk(id);
    if (!task) {
      throw boom.notFound('task not found');
    }
    const updatedTask = await task.update(changes);
    return updatedTask;
  }
}

export default TaskService;
