import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

@ApiTags('Anime')
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Public()
  @Get('rating/:id')
  @ApiParam({
    name: 'id',
    description: 'ID of the anime',
    example: 'classroom-of-the-elite',
    required: true,
  })
  async getRating(@Param() { id }: { id: string }) {
    const rating = await this.animeService.getRating(id);
    return rating;
  }

  @Public()
  @Get('comments/:id')
  @ApiParam({
    name: 'id',
    description: 'ID of the anime',
    example: 'classroom-of-the-elite',
  })
  async getComments(@Param() { id }: { id: string }) {
    const comments = await this.animeService.getComments(id);
    return comments;
  }

  @Post('comments')
  async addComment(@User() user: UserEntity, @Body() dto: CreateCommentDto) {
    const comment = await this.animeService.addComment({
      authorId: user.id,
      ...dto,
    });
    return comment;
  }

  @Post('rating')
  async setRating(@User() user: UserEntity, @Body() dto: CreateReviewDto) {
    const review = await this.animeService.setRating({
      userId: user.id,
      ...dto,
    });
    return review;
  }

  @Delete('comments/:id')
  @ApiParam({
    name: 'id',
    description: 'ID of the comment',
  })
  async removeComment(
    @User() user: UserEntity,
    @Param() { id }: { id: string },
  ) {
    const existingComment = await this.animeService.findCommentById(id);
    if (!existingComment) throw new NotFoundException('Comment not found');

    const isOwner = existingComment.authorId === user.id;
    if (!isOwner) {
      throw new ForbiddenException(
        'You do not have permission to delete this comment',
      );
    }

    const comment = await this.animeService.deleteComment(id);
    return comment;
  }
}
