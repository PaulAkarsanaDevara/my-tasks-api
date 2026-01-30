import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { TYPES } from '../../containers/types';
import { asyncHandler } from '../../common/utils/asyncHandler';
import { ResponseApiWriter } from '../../common/utils/response';

import { TaskService } from './task.service';

@injectable()
export class TaskController {
  constructor(
    @inject(TYPES.TaskService)
    private taskService: TaskService,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const task = await this.taskService.create(userId, req.body);
    return ResponseApiWriter.success(res, task, 'Task created', 201);
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const tasks = await this.taskService.getAll(userId);
    return ResponseApiWriter.success(res, tasks, `Get All Task By UserId: ${userId}`);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const taskId = req.params.id.toString();
    const task = await this.taskService.update(userId, taskId, req.body);
    return ResponseApiWriter.success(res, task, 'Task updated');
  });

  complete = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const taskId = req.params.id.toString();
    const task = await this.taskService.complete(userId, taskId);
    return ResponseApiWriter.success(res, task, 'Task completed');
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const taskId = req.params.id.toString();
    await this.taskService.delete(userId, taskId);
    return ResponseApiWriter.success(res, null, 'Task deleted');
  });

  archive = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const taskId = req.params.id.toString();
    await this.taskService.archive(userId, taskId);
    return ResponseApiWriter.success(res, null, 'Task archive');
  });
}
