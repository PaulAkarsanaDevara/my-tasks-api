import { ContainerModule } from 'inversify';

import { TYPES } from '../types';
import { registerModule } from '../module-registry';
import { AuthController } from '../../modules/auth/auth.controller';
import { AuthService } from '../../modules/auth/auth.service';
import { AuthRepository } from '../../modules/auth/auth.repository';

export const AuthModule = new ContainerModule((options) => {
  const { bind } = options;

  registerModule('AuthModule', 'Authentication & Authorization');

  bind<AuthController>(TYPES.AuthController).to(AuthController);
  bind<AuthService>(TYPES.AuthService).to(AuthService);
  bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);
});
