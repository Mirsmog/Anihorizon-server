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
    const user: UserEntity = await this.userService.findByEmailOrName({
      email,
    });
    if (!user) throw new BadRequestException('User not found');
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');
    return user;
  }

  login(user: UserEntity) {
    const jti = uuidv4();
    const tokens = this.tokenService.generateTokens(user, jti);
    return tokens;
  }

  async register(userDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmailOrName({
      email: userDto.email,
    });

    if (existingUser) throw new BadRequestException('email already exists');
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const newUser = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });

    return this.login(newUser);
  }
}
