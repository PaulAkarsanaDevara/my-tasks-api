import { Response } from 'express';

import { ApiResponse } from '../interfaces/apiResponse.interface';

export class ResponseApiWriter {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200,
    meta?: Record<string, any>,
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      ...(meta && { meta }),
    };

    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    message = 'Internal Server Error',
    statusCode = 500,
    errors?: any[] | any,
  ) {
    const response: ApiResponse = {
      success: false,
      message,
      ...(errors && { errors }),
    };

    return res.status(statusCode).json(response);
  }
}
