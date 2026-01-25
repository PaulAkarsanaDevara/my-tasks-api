import { inject, injectable } from 'inversify';

import { TYPES } from '../../containers/types';

import { AuditRepository } from './audit.repository';

@injectable()
export class AuditService {
  constructor(
    @inject(TYPES.AuditRepository)
    private repo: AuditRepository,
  ) {}

  log(data: {
    userId?: string;
    action: string;
    resource: string;
    resourceId?: string;
    metadata?: any;
  }) {
    return this.repo.create(data);
  }
}
