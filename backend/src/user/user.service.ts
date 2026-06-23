import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findUserByUsername(username: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  async createUser(email: string, password: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
