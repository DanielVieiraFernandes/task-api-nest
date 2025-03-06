import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import {
  TASK_REPOSITORY,
  TaskRepository,
} from '../repositories/task-repository';

interface GetTaskUseCaseRequest {
  taskId: string
}

interface GetTaskUseCaseResponse {
  task: Omit<Task, 'userId'>
}

@Injectable()
export class GetTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: TaskRepository
  ) {}

  async execute({
    taskId
  }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {

    const task = await this.taskRepository.findById(taskId);

    if(!task){
        throw new NotFoundException('Task not found');
    }

    return {
      task
    };
  }
}
