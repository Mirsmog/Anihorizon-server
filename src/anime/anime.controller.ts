import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiParam } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Public()
  @Get('rating:id')
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

  @Post('rating')
  async setRating(@User() user: UserEntity, @Body() dto: CreateReviewDto) {
    const review = await this.animeService.setRating({
      userId: user.id,
      ...dto,
    });
    return review;
  }
}
