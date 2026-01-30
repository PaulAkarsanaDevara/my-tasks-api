import { Router } from 'express';

import container from '../../containers/container';
import { TYPES } from '../../containers/types';
import { validateDto } from '../../middlewares/validate-dto';
import { authMiddleware } from '../../middlewares/auth.middleware';

import { TaskController } from './task.controller';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const router = Router();
const controller = container.get<TaskController>(TYPES.TaskController);

router.use(authMiddleware);

router.post('/', validateDto(CreateTaskDto), controller.create);
router.get('/', controller.getAll);
router.patch('/:id', validateDto(UpdateTaskDto), controller.update);
router.patch('/:id/complete', controller.complete);
router.delete('/:id', controller.delete);

export default router;
