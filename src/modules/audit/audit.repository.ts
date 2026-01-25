import { injectable } from 'inversify';

import { AuditLogModel } from './audit-log.model';

@injectable()
export class AuditRepository {
  create(payload: any) {
    return AuditLogModel.create(payload);
  }
}
