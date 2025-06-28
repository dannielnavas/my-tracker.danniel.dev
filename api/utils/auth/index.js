import passport from 'passport';
import jwtStrategy from './strategies/jwt.strategy.js';
import localStrategy from './strategies/local.strategy.js';

passport.use(localStrategy);
passport.use(jwtStrategy);
