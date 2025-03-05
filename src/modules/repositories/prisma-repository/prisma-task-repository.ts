import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { TaskRepository } from '../task-repository';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private prisma: PrismaService) {}

  async create({ description, name, userId }: Prisma.TaskUncheckedCreateInput) {
    await this.prisma.task.create({
      data: {
        description,
        name,
        userId,
      },
    });
  }

  async findByUserId(userId: string, page: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      omit: {
        userId: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return tasks;
  }

  async save(data: Partial<Prisma.TaskUncheckedCreateInput>, userId: string, taskId: string) {
    const task = await this.prisma.task.update({
      where: {
        userId,
        id: taskId
      },
      omit: {
        userId: true,
      },
      data,
    });

    return task;
  }

  async delete(taskId: string, userId: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        userId,
        id: taskId,
      },
    });
  }
}
