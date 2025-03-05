import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserRepository } from '../user-repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string){
    const user = await this.prisma.user.findUnique({
      where:{
        email,
      }
    })

    return user;
  }
}
