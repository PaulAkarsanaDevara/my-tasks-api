import { Request, Response, NextFunction } from 'express';

import { ResponseApiWriter } from '../common/utils/response';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = 500;

  console.error({
    method: req.method,
    path: req.originalUrl,
    message: err.message,
  });

  return ResponseApiWriter.error(res, err.message, statusCode, err.stack);
};
