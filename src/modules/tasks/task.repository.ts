import { injectable } from 'inversify';

import { ITask, TaskModel } from './task.model';

@injectable()
export class TaskRepository {
  create(data: ITask) {
    return TaskModel.create(data);
  }

  findAll(userId: string) {
    return TaskModel.find({
      userId: userId,
      // isArchived: false,
    }).sort({ createdAt: -1 });
  }

  findById(taskId: string, userId: string) {
    return TaskModel.findOne({
      _id: taskId,
      userId,
      isArchived: false,
    });
  }

  update(taskId: string, userId: string, data: any) {
    return TaskModel.findOneAndUpdate({ _id: taskId, userId }, data, { new: true });
  }

  archive(taskId: string, userId: string) {
    return TaskModel.findOneAndUpdate({ _id: taskId, userId }, { isArchived: true }, { new: true });
  }

  delete(taskId: string, userId: string) {
    return TaskModel.findOneAndDelete({
      _id: taskId,
      userId,
    });
  }
}
