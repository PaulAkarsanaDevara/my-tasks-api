import path from 'path';

import dotenv from 'dotenv';

import { connectDB } from './config/database';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

import { app } from './app';
import { env } from './config/env';

(async () => {
  await connectDB();
  app.listen(env.port, env.host, () => {
    console.log(`Server running at http://${env.host}:${env.port}`);
  });
})();
