import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/current-user-decorator';
import { UserPayload } from 'src/modules/auth/jwt.strategy';
import { CreateTaskUseCase } from 'src/modules/use-cases/create-task';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';

const createTaskBodySchema = z.object({
  name: z.string(),
  description: z.string().default('Sem descrição'),
});

type CreateTaskBodySchema = z.infer<typeof createTaskBodySchema>;

@Controller('/task')
@UseGuards(JwtAuthGuard)
export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createTaskBodySchema))
    body: CreateTaskBodySchema
  ) {
    const { name, description } = body;
    const { sub: userId } = user;

    await this.createTaskUseCase.execute({
      description,
      taskName: name,
      userId,
    });
  }
}
