import { Prisma, Task } from '@prisma/client';

export const TASK_REPOSITORY = 'TaskRepository';

export interface TaskRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<void>;
  findByUserId(userId: string, page: number): Promise<Omit<Task, 'userId'>[]>;
  findById(taskId: string): Promise<Omit<Task, 'userId'> | null>;
  save(data: Partial<Prisma.TaskUncheckedCreateInput>, userId: string, taskId: string): Promise<Omit<Task, 'userId'>>;
  delete(taskId: string, userId: string): Promise<void>;
}
