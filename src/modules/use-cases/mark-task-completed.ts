import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import {
  TASK_REPOSITORY,
  TaskRepository,
} from '../repositories/task-repository';

interface MarkTaskUseCaseRequest {
  taskId: string;
  userId: string;
}

interface MarkTaskUseCaseResponse {
  task: Omit<Task, 'userId'>;
}

@Injectable()
export class MarkTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: TaskRepository
  ) {}

  async execute({
    taskId,
    userId,
  }: MarkTaskUseCaseRequest): Promise<MarkTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.completedAt = new Date();

    await this.taskRepository.save(task, userId, taskId);

    return {
      task,
    };
  }
}
