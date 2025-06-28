import express from 'express';
import passport from 'passport';
import TaskService from './../services/task.service.js';

const router = express.Router();
const service = new TaskService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const tasks = await service.findAllTasksByUserId(user.sub);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const task = req.body;
      const newTask = await service.createTask(task);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const updatedTask = await service.update(id, changes);
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
