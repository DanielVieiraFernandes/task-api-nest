import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateController } from './infra/controllers/authenticate.controller';
import { CreateAccountController } from './infra/controllers/create-account.controller';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './modules/repositories/repository.module';
import { AuthenticateUseCase } from './modules/use-cases/authenticate';
import { CreateAccountUseCase } from './modules/use-cases/create-account';
import { CreateTaskUseCase } from './modules/use-cases/create-task';
import { CreateTaskController } from './infra/controllers/create-task.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    RepositoryModule,
    AuthModule,
  ],
  controllers: [CreateAccountController, AuthenticateController, CreateTaskController],
  providers: [CreateAccountUseCase, AuthenticateUseCase, CreateTaskUseCase],
})
export class AppModule {}
