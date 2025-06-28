import { DataTypes, Model } from 'sequelize';

const USER_TABLE = 'users';

const UserSchema = {
  userId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'user_id',
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  fullName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'full_name',
  },
  profilePicture: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'profile_picture',
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'free',
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'password',
  },
  subscriptionPlanId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'subscription_plan_id',
  },
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.SubscriptionPlan, {
      as: 'subscriptionPlan',
      foreignKey: 'subscriptionPlanId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

export { User, USER_TABLE, UserSchema };
