import { Request, Response, NextFunction } from 'express';

import container from '../containers/container';
import { TYPES } from '../containers/types';
import { AuditService } from '../modules/audit/audit.service';

export function auditMiddleware(action: string, resource: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', async () => {
      if (res.statusCode < 400) {
        const audit = container.get<AuditService>(TYPES.AuditService);

        await audit.log({
          userId: (req as any).user?.id,
          action,
          resource,
          metadata: {
            ip: req.ip,
            userAgent: req.headers['user-agent'],
          },
        });
      }
    });

    next();
  };
}
