import { DataTypes, Model } from 'sequelize';

const TASKS_TABLE = 'tasks';

const TasksSchema = {
  taskId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'task_id',
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  statusTaskId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'status_task_id',
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
  },
};

class Tasks extends Model {
  static associate(models) {
    this.belongsTo(models.StatusTask, {
      as: 'statusTask',
      foreignKey: 'statusTaskId',
    });
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASKS_TABLE,
      modelName: 'Tasks',
    };
  }
}

export { Tasks, TASKS_TABLE, TasksSchema };
