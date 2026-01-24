import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { errorHandler } from './middlewares/errorHandler';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(errorHandler);
