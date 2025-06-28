import express from 'express';
import passport from 'passport';
import validatorHandler from './../middlewares/validator.handler.js';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from './../schemas/user.schema.js';
import UserService from './../services/user.service.js';

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      console.log(req);
      const user = req.user;
      const result = await service.findOne(user.sub);
      delete result.dataValues.password;
      delete result.dataValues.createdAt;
      delete result.dataValues.updatedAt;
      delete result.dataValues.userId;
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
