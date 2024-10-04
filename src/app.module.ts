import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { CommentsModule } from './comments/comments.module';
import { AnimeModule } from './anime/anime.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    TokenModule,
    CommentsModule,
    AnimeModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtGuard }],
})
export class AppModule {}
