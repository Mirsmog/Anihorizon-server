import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { CommentsService } from 'src/comments/comments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewsService } from 'src/reviews/reviews.service';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService, PrismaService, CommentsService, ReviewsService],
})
export class AnimeModule {}
