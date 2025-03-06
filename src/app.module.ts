import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { CreateTaskController } from './infra/controllers/task/create-task.controller';
import { DeleteTaskController } from './infra/controllers/task/delete-task.controller';
import { FetchTasksController } from './infra/controllers/task/fetch-tasks.controller';
import { GetTaskController } from './infra/controllers/task/get-task-details.controller';
import { MarkTaskController } from './infra/controllers/task/mark-task-completed.controller';
import { UpdateTaskController } from './infra/controllers/task/update-task.controller';
import { AuthenticateController } from './infra/controllers/user/authenticate.controller';
import { CreateAccountController } from './infra/controllers/user/create-account.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { AuthenticateUseCase } from './modules/use-cases/authenticate';
import { CreateAccountUseCase } from './modules/use-cases/create-account';
import { CreateTaskUseCase } from './modules/use-cases/create-task';
import { DeleteTaskUseCase } from './modules/use-cases/delete-task';
import { FetchTasksUseCase } from './modules/use-cases/fetch-tasks';
import { GetTaskUseCase } from './modules/use-cases/get-task-details';
import { MarkTaskUseCase } from './modules/use-cases/mark-task-completed';
import { UpdateTaskUseCase } from './modules/use-cases/update-task';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    RepositoryModule,
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateTaskController,
    FetchTasksController,
    UpdateTaskController,
    DeleteTaskController,
    GetTaskController,
    MarkTaskController,
  ],
  providers: [
    CreateAccountUseCase,
    AuthenticateUseCase,
    CreateTaskUseCase,
    FetchTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    GetTaskUseCase,
    MarkTaskUseCase,
  ],
})
export class AppModule {}
