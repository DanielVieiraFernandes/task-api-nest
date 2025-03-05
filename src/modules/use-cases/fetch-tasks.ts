import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import {
  TASK_REPOSITORY,
  TaskRepository,
} from '../repositories/task-repository';

interface FetchTasksUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchTasksUseCaseResponse {
  tasks: Omit<Task, 'userId'>[];
}

@Injectable()
export class FetchTasksUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: TaskRepository
  ) {}

  async execute({
    page,
    userId,
  }: FetchTasksUseCaseRequest): Promise<FetchTasksUseCaseResponse> {
    const tasks = await this.taskRepository.findByUserId(userId, page);

    return {
      tasks,
    };
  }
}
