import { Inject, Injectable } from '@nestjs/common';
import {
  TASK_REPOSITORY,
  TaskRepository,
} from 'src/modules/repositories/task-repository';

interface CreateTaskUseCaseRequest {
  taskName: string;
  description: string;
  userId: string;
}

interface CreateTaskUseCaseResponse {}

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository
  ) {}

  async execute({
    description,
    taskName,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    await this.taskRepository.create({ description, name: taskName, userId });

    return {};
  }
}
