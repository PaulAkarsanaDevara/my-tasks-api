import 'reflect-metadata';
import { Container } from 'inversify';

import { AuthModule } from './modules/auth.module';
import { LogModule } from './modules/log.module';
import { TaskModule } from './modules/task.module';

const container = new Container({
  defaultScope: 'Singleton',
});

container.load(AuthModule, LogModule, TaskModule);

export default container;
