import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/modules/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { UserPayload } from 'src/modules/auth/jwt.strategy';
import { FetchTasksUseCase } from 'src/modules/use-cases/fetch-tasks';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const fetchTaskQuerySchema = z.object({
  page: z.coerce.number().default(1),
});
type FetchTaskQuerySchema = z.infer<typeof fetchTaskQuerySchema>;

@Controller('/task')
@UseGuards(JwtAuthGuard)
export class FetchTasksController {
  constructor(private fetchTasksUseCase: FetchTasksUseCase) {}

  @Get()
  async handle(
    @CurrentUser() user: UserPayload,
    @Query(new ZodValidationPipe(fetchTaskQuerySchema))
    query: FetchTaskQuerySchema
  ) {
    const { page } = query;
    const { sub: userId } = user;

    const { tasks } = await this.fetchTasksUseCase.execute({ userId, page });

    return {
      tasks,
    };
  }
}
