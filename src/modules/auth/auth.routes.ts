import { Router } from 'express';

import container from '../../containers/container';
import { TYPES } from '../../containers/types';
import { validateDto } from '../../middlewares/validate-dto';
import { loginLimiter } from '../../middlewares/rate-limit';

import { AuthController } from './auth.controller';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const router = Router();

const controller = container.get<AuthController>(TYPES.AuthController);

router.post('/register', validateDto(RegisterDto), controller.register);
router.post('/login', loginLimiter, validateDto(LoginDto), controller.login);
router.get('/verify-email', controller.verifyEmail);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);

export default router;
