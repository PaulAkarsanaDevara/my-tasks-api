import 'reflect-metadata';
import { Container } from 'inversify';

import { AuthModule } from './modules/auth.module';
import { LogModule } from './modules/log.module';

const container = new Container({
  defaultScope: 'Singleton',
});

container.load(AuthModule, LogModule);

export default container;
