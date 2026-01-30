import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { errorHandler } from './middlewares/errorHandler';
import { moduleRegistry } from './containers/module-registry';
import authRoutes from './modules/auth/auth.routes';
import taskRoutes from './modules/tasks/task.routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.get('/_debug/modules', (_req, res) => {
  res.json(moduleRegistry);
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);
