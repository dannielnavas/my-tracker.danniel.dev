import { StatusTask, StatusTaskSchema } from './statusTask.model.js';
import {
  SubscriptionPlan,
  SubscriptionPlanSchema,
} from './subscriptionPlan.model.js';
import { Tasks, TasksSchema } from './tasks.model.js';
import { User, UserSchema } from './user.model.js';

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  SubscriptionPlan.init(
    SubscriptionPlanSchema,
    SubscriptionPlan.config(sequelize),
  );
  Tasks.init(TasksSchema, Tasks.config(sequelize));
  StatusTask.init(StatusTaskSchema, StatusTask.config(sequelize));

  User.associate(sequelize.models);
  SubscriptionPlan.associate(sequelize.models);
  Tasks.associate(sequelize.models);
  StatusTask.associate(sequelize.models);
}

export default setupModels;
