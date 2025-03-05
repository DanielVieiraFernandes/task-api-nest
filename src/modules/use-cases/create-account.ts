import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { USER_REPOSITORY, UserRepository } from 'src/modules/repositories/user-repository';

interface CreateAccountUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateAccountUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const passwordHash = await hash(password, 8);
    const user = await this.userRepository.create({
      email,
      name,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}
