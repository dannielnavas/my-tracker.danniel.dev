import express from 'express';
import authRouter from './auth.router.js';
import taskRouter from './task.router.js';
import userRouter from './user.router.js';

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', userRouter);
  router.use('/tasks', taskRouter);
}

export default routerApi;
