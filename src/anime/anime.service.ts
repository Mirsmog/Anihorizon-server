import { Injectable } from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentWithUserIdDto } from 'src/comments/dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDtoWithUserId } from './dto/create-review.dto';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class AnimeService {
  constructor(
    private prisma: PrismaService,
    private comments: CommentsService,
    private review: ReviewsService,
  ) {}

  async findById(id: string) {
    const anime = await this.prisma.anime.findUnique({ where: { id } });
    return anime;
  }

  async findCommentById(id: string) {
    const comment = await this.comments.findById(id);
    return comment;
  }

  async getComments(id: string) {
    const comments = await this.comments.findAllByAnimeId(id);
    return comments;
  }

  async addComment(dto: CreateCommentWithUserIdDto) {
    const comment = await this.comments.create(dto);
    return comment;
  }

  async deleteComment(id: string) {
    const comment = await this.comments.delete(id);
    return comment;
  }

  async getRating(id: string) {
    const rating = await this.review.findAllByAnimeId(id);
    return rating;
  }

  async setRating(dto: CreateReviewDtoWithUserId) {
    const rating = await this.review.create(dto);
    return rating;
  }
}
