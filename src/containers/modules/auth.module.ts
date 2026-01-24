import { ContainerModule } from 'inversify';

import { registerModule } from '../module-registry';

export const AuthModule = new ContainerModule(() => {
  registerModule('AuthModule', 'Authentication & Authorization');
});
