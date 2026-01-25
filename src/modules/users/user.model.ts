import { Schema, Types, model } from 'mongoose';

export interface IRefreshToken {
  token: string;
  expiresAt: Date;
}

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpiredAt: Date | null;
  refreshTokens: Types.DocumentArray<IRefreshToken>;
  isActive: boolean;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpiredAt: Date,
    refreshTokens: [refreshTokenSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const userModel = model<IUser>('User', UserSchema);
