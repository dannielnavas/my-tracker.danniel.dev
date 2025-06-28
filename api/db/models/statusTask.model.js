import { DataTypes, Model } from 'sequelize';

const STATUS_TASK_TABLE = 'status_tasks';

const StatusTaskSchema = {
  statusTaskId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'status_task_id',
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class StatusTask extends Model {
  static associate(models) {
    this.hasMany(models.Tasks, {
      as: 'tasks',
      foreignKey: 'statusTaskId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STATUS_TASK_TABLE,
      modelName: 'StatusTask',
    };
  }
}

export { STATUS_TASK_TABLE, StatusTask, StatusTaskSchema };
