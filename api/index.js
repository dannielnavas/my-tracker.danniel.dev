import cors from 'cors';
import express from 'express';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler,
} from './middlewares/error.handler.js';
import routerApi from './routes/index.js';
import './utils/auth/index.js';

const app = express();

app.use(express.json()); // implementar para los post

app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
