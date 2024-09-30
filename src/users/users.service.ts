import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password, avatar }: CreateUserDto) {
    const { password: userPassword, ...user } = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        profile: { create: { avatar } },
      },
      include: { profile: true },
    });
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile: true,
        comments: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return users;
  }

  async findById(id: string) {
    const { password, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmailOrName(identifier: string) {
    const { password, ...user } = await this.prisma.user.findFirst({
      where: { OR: [{ email: identifier }, { name: identifier }] },
    });
    return user;
  }

  //update(id: string, updateUserDto: UpdateUserDto) {}

  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id } });
    return user.id;
  }
}
