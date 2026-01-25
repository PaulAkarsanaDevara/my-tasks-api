import { ContainerModule } from 'inversify';

import { TYPES } from '../types';
import { registerModule } from '../module-registry';
import { AuditService } from '../../modules/audit/audit.service';
import { AuditRepository } from '../../modules/audit/audit.repository';

export const LogModule = new ContainerModule((options) => {
  const { bind } = options;

  registerModule('AuditLogModule', 'Audit Logs');

  bind<AuditService>(TYPES.AuditService).to(AuditService);
  bind<AuditRepository>(TYPES.AuditRepository).to(AuditRepository);
});
