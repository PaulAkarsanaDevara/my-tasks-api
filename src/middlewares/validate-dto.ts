import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dto, req.body);
    const errors = await validate(instance);

    if (errors.length > 0) {
      const messages = errors.flatMap((err) => Object.values(err.constraints || {}));

      return res.status(422).json({
        message: 'Validation error',
        errors: messages,
      });
    }

    req.body = instance;
    next();
  };
}
