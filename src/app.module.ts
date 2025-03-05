import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateController } from './infra/controllers/user/authenticate.controller';
import { CreateAccountController } from './infra/controllers/user/create-account.controller';
import { CreateTaskController } from './infra/controllers/task/create-task.controller';
import { FetchTasksController } from './infra/controllers/task/fetch-tasks.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { AuthenticateUseCase } from './modules/use-cases/authenticate';
import { CreateAccountUseCase } from './modules/use-cases/create-account';
import { CreateTaskUseCase } from './modules/use-cases/create-task';
import { FetchTasksUseCase } from './modules/use-cases/fetch-tasks';
import { UpdateTaskController } from './infra/controllers/task/update-task.controller';
import { DeleteTaskController } from './infra/controllers/task/delete-task.controller';
import { UpdateTaskUseCase } from './modules/use-cases/update-task';
import { DeleteTaskUseCase } from './modules/use-cases/delete-task';

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
  ],
  providers: [
    CreateAccountUseCase,
    AuthenticateUseCase,
    CreateTaskUseCase,
    FetchTasksUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
})
export class AppModule {}
