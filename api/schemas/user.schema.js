import Joi from 'joi';

const user_id = Joi.number().integer();
const email = Joi.string().email();
const fullName = Joi.string().min(3);
const profilePicture = Joi.string();
const password = Joi.string().min(8);
const role = Joi.string().min(4).max(5).valid('admin', 'user');
const subscriptionPlanId = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  fullName: fullName.required(),
  profilePicture: profilePicture.required(),
  password: password.required(),
  role: role.required(),
  subscriptionPlanId: subscriptionPlanId.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  fullName: fullName,
  profilePicture: profilePicture,
  password: password,
  role: role,
  subscriptionPlanId: subscriptionPlanId,
});

const getUserSchema = Joi.object({
  user_id: user_id.required(),
});

export { createUserSchema, getUserSchema, updateUserSchema };
