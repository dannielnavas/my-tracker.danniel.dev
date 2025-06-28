import express from 'express';
import passport from 'passport';
import AuthServices from './../services/auth.service.js';

const service = new AuthServices();
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log(user);
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

export default router;
