import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  profile(@User() user: UserEntity) {
    return this.usersService.findById(user.id);
  }

  @Patch()
  update(@User() user: UserEntity, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete()
  remove(@User() user: UserEntity) {
    return this.usersService.remove(user.id);
  }
}
