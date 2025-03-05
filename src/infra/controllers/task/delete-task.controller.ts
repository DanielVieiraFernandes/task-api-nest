import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation-pipe';
import { CurrentUser } from 'src/modules/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { UserPayload } from 'src/modules/auth/jwt.strategy';
import { DeleteTaskUseCase } from 'src/modules/use-cases/delete-task';
import { z } from 'zod';

const deleteTaskBodySchema = z.object({
  taskId: z.string().uuid(),
});

type DeleteTaskBodySchema = z.infer<typeof deleteTaskBodySchema>;

@Controller('/task/:taskId')
@UseGuards(JwtAuthGuard)
export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  @Delete()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param(new ZodValidationPipe(deleteTaskBodySchema)) param: DeleteTaskBodySchema
  ) {
    const { taskId } = param;
    const { sub: userId } = user;

    await this.deleteTaskUseCase.execute({
      taskId,
      userId,
    });
  }
}
