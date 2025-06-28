import { DataTypes, Model } from 'sequelize';

const SUBSCRIPTION_PLAN_TABLE = 'subscription_plans';

const SubscriptionPlanSchema = {
  subscriptionPlanId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'subscription_plan_id',
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class SubscriptionPlan extends Model {
  static associate(models) {
    this.hasMany(models.User, {
      as: 'users',
      foreignKey: 'subscriptionPlanId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBSCRIPTION_PLAN_TABLE,
      modelName: 'SubscriptionPlan',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

export { SUBSCRIPTION_PLAN_TABLE, SubscriptionPlan, SubscriptionPlanSchema };
