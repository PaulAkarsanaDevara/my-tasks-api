import jwt from 'jsonwebtoken';

import { env } from '../../config/env';

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.accessTokenTtl });

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.accessTokenTtl });

export const verifyToken = (token: string) => jwt.verify(token, env.jwtSecret) as JwtPayload;
