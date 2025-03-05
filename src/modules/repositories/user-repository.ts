import { Prisma, User } from '@prisma/client';

export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>
}
