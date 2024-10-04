import { Injectable } from '@nestjs/common';
import { CreateReviewDtoWithUserId } from 'src/anime/dto/create-review.dto';
import { UpdateReviewDto } from 'src/anime/dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async findAllByAnimeId(id: string) {
    const reviews = await this.prisma.review.findMany({
      where: { animeId: id },
    });
    return reviews;
  }

  async findAllByUserId(id: string) {
    const reviews = await this.prisma.review.findMany({
      where: { userId: id },
    });
    return reviews;
  }

  async findById(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    return review;
  }

  async create(dto: CreateReviewDtoWithUserId) {
    await this.prisma.anime.upsert({
      where: { id: dto.animeId },
      create: { id: dto.animeId },
      update: {},
    });

    const existingReview = await this.prisma.review.findFirst({
      where: { AND: [{ animeId: dto.animeId, userId: dto.userId }] },
    });

    if (existingReview) {
      const review = await this.update(existingReview.id, dto);
      return review;
    }

    const review = await this.prisma.review.create({
      data: dto,
    });

    return review;
  }

  async update(id: string, dto: UpdateReviewDto) {
    const review = await this.prisma.review.update({
      where: { id },
      data: { value: dto.value },
    });
    return review;
  }
}
