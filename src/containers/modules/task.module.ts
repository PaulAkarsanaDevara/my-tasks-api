import { ContainerModule } from 'inversify';

import { registerModule } from '../module-registry';
import { TaskController } from '../../modules/tasks/task.controller';
import { TYPES } from '../types';
import { TaskService } from '../../modules/tasks/task.service';
import { TaskRepository } from '../../modules/tasks/task.repository';

export const TaskModule = new ContainerModule((options) => {
  const { bind } = options;

  registerModule('TaskModule', 'Task');

  bind<TaskController>(TYPES.TaskController).to(TaskController);
  bind<TaskService>(TYPES.TaskService).to(TaskService);
  bind<TaskRepository>(TYPES.TaskRepository).to(TaskRepository);
});
