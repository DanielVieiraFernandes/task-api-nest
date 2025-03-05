import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import {
  TASK_REPOSITORY,
  TaskRepository,
} from 'src/modules/repositories/task-repository';

interface UpdateTaskUseCaseRequest {
  taskName: string;
  description: string;
  taskId: string;
  userId: string;
}

interface UpdateTaskUseCaseResponse {
  task: Omit<Task, 'userId'>;
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository
  ) {}

  async execute({
    userId,
    description,
    taskName,
    taskId
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.taskRepository.save(
      { description, name: taskName},
      userId,
      taskId
    );

    return {
      task
    };
  }
}
