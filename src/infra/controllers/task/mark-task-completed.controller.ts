import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation-pipe';
import { CurrentUser } from 'src/modules/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { UserPayload } from 'src/modules/auth/jwt.strategy';
import { MarkTaskUseCase } from 'src/modules/use-cases/mark-task-completed';
import { z } from 'zod';

const markTaskParamSchema = z.object({
  taskId: z.string().uuid(),
});

type MarkTaskParamSchema = z.infer<typeof markTaskParamSchema>;

@Controller('/task/:taskId')
@UseGuards(JwtAuthGuard)
export class MarkTaskController {
  constructor(private markTaskUseCase: MarkTaskUseCase) {}

  @Patch()
  async handle(
    @Param(new ZodValidationPipe(markTaskParamSchema))
    param: MarkTaskParamSchema,
    @CurrentUser() user: UserPayload
  ) {
    const { taskId } = param;
    const { sub: userId } = user;
    const { task } = await this.markTaskUseCase.execute({
      taskId,
      userId,
    });

    return {
      task,
    };
  }
}
