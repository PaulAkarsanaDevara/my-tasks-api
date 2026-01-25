import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { userModel } from '../users/user.model';
import { AppError } from '../../common/errors/AppError';
import { signAccessToken, signRefreshToken } from '../../common/utils/jwt';
import { TYPES } from '../../containers/types';
import { emailService } from '../../services/email.service';
import { AuditService } from '../audit/audit.service';

import { AuthRepository } from './auth.repository';

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.AuthRepository)
    private authRepo: AuthRepository,
    @inject(TYPES.AuditService)
    private logService: AuditService,
  ) {}

  async register(name: string, username: string, email: string, password: string) {
    email = email.toLowerCase().trim();

    const existingUser = await this.authRepo.findByEmail(email);
    if (existingUser) throw new AppError('Email sudah terdaftar');

    const hashPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken: string = uuid();
    const payload = await userModel.create({
      name,
      username,
      email,
      password: hashPassword,
      emailVerificationToken,
      emailVerificationExpiredAt: new Date(Date.now() + 86400000),
      isEmailVerified: false,
    });

    try {
      await emailService.sendVerification(name, email, emailVerificationToken);
    } catch (err) {
      await userModel.deleteOne({ _id: payload._id });
      throw new AppError(`Registrasi gagal: ${err}`);
    }

    const { password: _, ...data } = payload.toObject();

    await this.logService.log({
      userId: payload._id.toString(),
      action: 'REGISTER',
      resource: 'AUTH',
    });

    return data;
  }

  async login(identifier: string, password: string) {
    const existingUser = await userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!existingUser) throw new AppError('Email / username atau password salah.', 401);

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) throw new AppError('Email / username atau password salah.', 401);

    if (!existingUser.isEmailVerified) throw new AppError('Email belum diverifikasi.', 403);

    const payload = {
      userId: String(existingUser._id),
      email: existingUser.email,
      role: existingUser.role,
    };

    await this.logService.log({
      userId: existingUser._id.toString(),
      action: 'LOGIN',
      resource: 'AUTH',
    });

    const accessToken = signAccessToken(payload) as string;
    const refreshToken = signRefreshToken(payload) as string;

    existingUser.refreshTokens.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 86400000),
    });

    await existingUser.save();

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    await userModel.updateOne(
      { 'refreshTokens.token': refreshToken },
      { $pull: { refreshTokens: { token: refreshToken } } },
    );
  }

  async refresh(refreshToken: string) {
    const user = await userModel.findOne({
      'refreshTokens.token': refreshToken,
    });

    if (!user) throw new Error('Invalid refresh token');

    // Ambil token
    const storedToken = user.refreshTokens.find((rt) => rt.token === refreshToken);

    if (!storedToken) throw new AppError('Invalid refresh token');

    // Cek expired
    if (storedToken.expiresAt < new Date()) {
      user.refreshTokens.pull({ token: refreshToken });
      await user.save();

      throw new Error('Refresh token expired');
    }

    // Hapus refresh token lama
    user.refreshTokens.pull({ token: refreshToken });

    const payload = {
      userId: String(user._id),
      email: user.email,
      role: user.role,
    };

    const newAccessToken = signAccessToken(payload) as string;
    const newRefreshToken = signRefreshToken(payload) as string;

    user.refreshTokens.push({
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await user.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async verifyEmail(token: any) {
    const user = await userModel.findOne({ emailVerificationToken: token });
    if (!user) throw new AppError('Token invalid', 400);

    user.isEmailVerified = true;
    user.emailVerificationToken = '';

    await user.save();
  }
}
