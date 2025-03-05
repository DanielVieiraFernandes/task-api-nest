import { Inject, Injectable } from '@nestjs/common';
import {
  TASK_REPOSITORY,
  TaskRepository,
} from 'src/modules/repositories/task-repository';

interface DeleteTaskUseCaseRequest {
  taskId: string;
  userId: string;
}

interface DeleteTaskUseCaseResponse {}

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository
  ) {}

  async execute({
    taskId,
    userId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    await this.taskRepository.delete(taskId, userId);

    return {};
  }
}
