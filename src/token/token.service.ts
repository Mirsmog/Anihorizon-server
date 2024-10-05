import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshTokenPayloadEntity } from './entities/refresh-token.entity';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async refreshTokens(oldRefreshToken: string) {
    try {
      const tokenPayload: RefreshTokenPayloadEntity =
        await this.jwtService.verify(oldRefreshToken, {
          secret: process.env.JWT_REFRESH_SECRET,
        });

      const existingToken = await this.prisma.refreshTokens.findUnique({
        where: { id: tokenPayload.jti },
      });

      if (!existingToken || existingToken.revoked) {
        throw new UnauthorizedException('Refresh Token invalid or revoked');
      }

      const isMatch = await bcrypt.compare(
        oldRefreshToken,
        existingToken.hashedToken,
      );

      if (!isMatch) throw new UnauthorizedException('Refresh Token mismatch');

      await this.deleteRefreshToken(existingToken.id);
      const { userId } = existingToken;

      const jti = uuidv4();
      const { accessToken, refreshToken } = this.generateTokens(userId, jti);

      await this.saveRefreshToken(userId, refreshToken, jti);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async findRefreshTokenByUserId(id: string) {
    const token = await this.prisma.refreshTokens.findUnique({ where: { id } });
    return token;
  }

  async saveRefreshToken(userId: string, refreshToken: string, jti: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    const savedToken = await this.prisma.refreshTokens.create({
      data: {
        id: jti,
        userId,
        hashedToken,
        revoked: false,
      },
    });
    return savedToken;
  }

  async deleteRefreshToken(id: string) {
    const token = await this.prisma.refreshTokens.update({
      where: { id },
      data: { revoked: true },
    });
    return token;
  }

  async revokeAllTokens(userId: string) {
    const tokens = await this.prisma.refreshTokens.updateMany({
      where: { userId },
      data: {
        revoked: true,
      },
    });
    return tokens;
  }

  generateTokens(userId: string, jti: string) {
    const accessToken = this.generateAcessToken(userId);
    const refreshToken = this.generateRefreshToken(userId, jti);
    return { accessToken, refreshToken };
  }

  generateAcessToken(userId: string) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'secret_a',
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN || '15m',
    });
    return token;
  }

  generateRefreshToken(userId: string, jti: string) {
    const payload = {
      userId,
      jti,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'secret_r',
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN || '14d',
    });
    return token;
  }
}
