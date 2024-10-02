import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  generateTokens(user: UserEntity, jti: string) {
    const accessToken = this.generateAcessToken(user);
    const refreshToken = this.generateRefreshToken(user, jti);
    return {
      accessToken,
      refreshToken,
    };
  }

  generateAcessToken(user: UserEntity) {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'secret_a',
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN || '15m',
    });
  }

  generateRefreshToken(user: UserEntity, jti: string) {
    const payload = {
      userId: user.id,
      jti,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'secret_r',
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN || '14d',
    });
  }
}
