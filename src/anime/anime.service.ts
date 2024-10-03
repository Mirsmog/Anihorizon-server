import { Injectable } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimeService {
  constructor(
    private prisma: PrismaService,
    private comments: CommentsService,
  ) {}
  async create(id: string) {
    const anime = await this.prisma.anime.create({ data: { id } });
    return anime;
  }
  async getComments(id: string) {
    const comments = await this.comments.findAllByAnimeId(id);
    return comments;
  }
  async addComment(dto: CreateCommentDto) {
    const comment = await this.comments.create(dto);
    return comment;
  }
  async getRating(id: string) {
    const rating = await this.prisma.review.findMany({
      where: { animeId: id },
    });
    return rating;
  }
}
