import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
}
