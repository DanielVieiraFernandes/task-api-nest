import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PrismaUserRepository } from './prisma-repository/prisma-user-repository';
import { USER_REPOSITORY } from './user-repository';
import { TASK_REPOSITORY } from './task-repository';
import { PrismaTaskRepository } from './prisma-repository/prisma-task-repository';

@Module({
  exports: [USER_REPOSITORY, TASK_REPOSITORY],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository
    }
  ],
})
export class RepositoryModule {}
