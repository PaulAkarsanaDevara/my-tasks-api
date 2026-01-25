import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // 5 percobaan
  message: {
    message: 'Too many login attempts. Try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
