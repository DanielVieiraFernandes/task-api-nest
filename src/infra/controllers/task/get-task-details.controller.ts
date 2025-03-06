import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation-pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { GetTaskUseCase } from 'src/modules/use-cases/get-task-details';
import { z } from 'zod';

const getTaskParamSchema = z.object({
  taskId: z.string().uuid(),
});

type GetTaskParamSchema = z.infer<typeof getTaskParamSchema>;

@Controller('/task/:taskId')
@UseGuards(JwtAuthGuard)
export class GetTaskController {
  constructor(private getTaskUseCase: GetTaskUseCase) {}

  @Get()
  async handle(
    @Param(new ZodValidationPipe(getTaskParamSchema)) param: GetTaskParamSchema
  ) {
    const { taskId } = param;

    const { task } = await this.getTaskUseCase.execute({
      taskId,
    });

    return {
      task,
    };
  }
}
