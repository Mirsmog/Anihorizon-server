import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findAllByAnimeId(id: string) {
    const comments = await this.prisma.comment.findMany({
      where: { animeId: id },
    });
    return comments;
  }

  async findAllByUserId(id: string) {
    const comments = await this.prisma.comment.findMany({
      where: { authorId: id },
    });
    return comments;
  }

  async findById(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });
    return comment;
  }

  async create(dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: dto,
    });
    return comment;
  }

  async update({ id, content }: UpdateCommentDto) {
    const comment = await this.prisma.comment.update({
      where: { id },
      data: { content },
    });
    return comment;
  }

  async delete(id: string) {
    const comment = await this.prisma.comment.delete({ where: { id } });
    return comment;
  }
}
