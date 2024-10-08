import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
  ) {}
  async validateUser(email: string, password: string) {
    const user: UserEntity = await this.userService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');
    return user;
  }

  async login(user: UserEntity) {
    const jti = uuidv4();
    const { accessToken, refreshToken } = this.tokenService.generateTokens(
      user.id,
      jti,
    );
    await this.tokenService.saveRefreshToken(user.id, refreshToken, jti);
    return { accessToken, refreshToken };
  }

  async register(userDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(userDto.email);
    // TODO: Fix login by name logic
    const IsNameInUse = await this.userService.findByName(userDto.name);

    if (existingUser) throw new BadRequestException('email already exists');
    if (IsNameInUse) throw new BadRequestException('name already in use');

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const newUser = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });

    return this.login(newUser);
  }

  async refreshTokens(oldRefreshToken: string) {
    const { accessToken, refreshToken } =
      await this.tokenService.refreshTokens(oldRefreshToken);
    return { accessToken, refreshToken };
  }
}
