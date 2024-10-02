import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    const id = '74c2b9e0-5cb9-459e-9afd-3bbd1e74e0bf';
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  profile(@User() user: UserEntity) {
    return this.usersService.findById(user.id);
  }

  @Delete()
  remove(@User() user: UserEntity) {
    return this.usersService.remove(user.id);
  }
}
