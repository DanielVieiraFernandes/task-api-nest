import { Prisma } from '@prisma/client';

export const TASK_REPOSITORY = 'TaskRepository';

export interface TaskRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<void>;
}
