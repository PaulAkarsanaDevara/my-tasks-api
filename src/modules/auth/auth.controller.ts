import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { TYPES } from '../../containers/types';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { ResponseApiWriter } from '../../common/utils/response';

import { AuthService } from './auth.service';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private authService: AuthService,
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;
    const data = await this.authService.register(name, username, email, password);
    return ResponseApiWriter.success(
      res,
      data,
      'Registrasi berhasil, Silakan verifikasi email anda.',
      201,
    );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const dto = req.body;
    const { accessToken, refreshToken } = await this.authService.login(dto.email, dto.password);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
    });

    res.json({ accessToken, refreshToken });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    await this.authService.logout(req.body.refreshToken);
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.status(204).send();
  });

  refresh = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    const tokens = await this.authService.refresh(token);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/api/auth/refresh',
    });

    res.json({ accessToken: tokens.accessToken });
  };

  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    await this.authService.verifyEmail(token);

    return ResponseApiWriter.success(res, null, 'Email berhasil diverifikasi');
  });
}
