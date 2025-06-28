import Joi from 'joi';

const taskId = Joi.number().integer();
const title = Joi.string().min(3);
const description = Joi.string().min(3);
const statusTaskId = Joi.number().integer();
const userId = Joi.number().integer();

const createTaskSchema = Joi.object({
  title: title.required(),
  statusTaskId: statusId.required(),
  userId: userId.required(),
});

const updateTaskSchema = Joi.object({
  title: title,
  statusTaskId: statusTaskId,
  userId: userId,
  description: description,
});

const getTaskSchema = Joi.object({
  taskId: taskId.required(),
});

export { createTaskSchema, getTaskSchema, updateTaskSchema };
