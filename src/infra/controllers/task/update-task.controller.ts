import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation-pipe';
import { CurrentUser } from 'src/modules/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { UserPayload } from 'src/modules/auth/jwt.strategy';
import { UpdateTaskUseCase } from 'src/modules/use-cases/update-task';
import { z } from 'zod';

const updateTaskBodySchema = z.object({
  name: z.string(),
  description: z.string().default('Sem descrição'),
});

type UpdateTaskBodySchema = z.infer<typeof updateTaskBodySchema>;

const updateTaskParamSchema = z.object({
    taskId: z.string().uuid()
});

type UpdateTaskParamSchema = z.infer<typeof updateTaskParamSchema>;

@Controller('/task/:taskId')
@UseGuards(JwtAuthGuard)
export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  @Put()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(new ZodValidationPipe(updateTaskParamSchema)) param: UpdateTaskParamSchema,
    @Body(new ZodValidationPipe(updateTaskBodySchema))
    body: UpdateTaskBodySchema
  ) {
    const { name, description } = body;
    const {taskId} = param;
    const { sub: userId } = user;

    await this.updateTaskUseCase.execute({
      description,
      taskName: name,
      userId,
      taskId
    });
  }
}
