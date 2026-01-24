import 'reflect-metadata';
import { Container } from 'inversify';

import { AuthModule } from './modules/auth.module';

const container = new Container({
  defaultScope: 'Singleton',
});

container.load(AuthModule);

export default container;
