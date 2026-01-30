import { inject, injectable } from 'inversify';

import { TYPES } from '../../containers/types';
import { AppError } from '../../common/errors/AppError';

import { TaskRepository } from './task.repository';

@injectable()
export class TaskService {
  constructor(
    @inject(TYPES.TaskRepository)
    private taskRepo: TaskRepository,
  ) {}

  create(userId: string, dto: any) {
    return this.taskRepo.create({
      ...dto,
      userId,
    });
  }

  getAll(userId: string) {
    return this.taskRepo.findAll(userId);
  }

  getById(userId: string, taskId: string) {
    const task = this.taskRepo.findById(taskId, userId);
    if (!task) throw new AppError('Task not found', 404);

    return task;
  }

  async update(userId: string, taskId: string, dto: any) {
    const task = await this.taskRepo.update(taskId, userId, dto);
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }

  async complete(userId: string, taskId: string) {
    const task = await this.taskRepo.update(taskId, userId, {
      status: 'completed',
      completedAt: new Date(),
    });
    if (!task) throw new AppError('Task not found', 404);
    return task;
  }

  async archive(userId: string, taskId: string) {
    return await this.taskRepo.archive(taskId, userId);
  }

  async delete(userId: string, taskId: string) {
    return await this.taskRepo.delete(taskId, userId);
  }
}
