import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation-pipe';
import { AuthenticateUseCase } from 'src/modules/use-cases/authenticate';
import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
export class AuthenticateController {
  constructor(
    private authenticateUseCase: AuthenticateUseCase,
    private jwt: JwtService
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(authenticateBodySchema))
    body: AuthenticateBodySchema
  ) {
    const { email, password } = body;

    const { user } = await this.authenticateUseCase.execute({
      email,
      password,
    });

    const access_token = this.jwt.sign({ sub: user.id });

    return {
      access_token,
    };
  }
}
