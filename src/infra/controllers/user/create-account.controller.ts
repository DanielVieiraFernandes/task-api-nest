import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation-pipe';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth-guard';
import { CreateAccountUseCase } from 'src/modules/use-cases/create-account';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/account')

export class CreateAccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private jwt: JwtService
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createAccountBodySchema))
    body: CreateAccountBodySchema
  ) {
    const { email, name, password } = body;

    const { user } = await this.createAccountUseCase.execute({
      email,
      name,
      password,
    });

    const access_token = this.jwt.sign({ sub: user.id });

    return {
      access_token,
    };
  }
}
