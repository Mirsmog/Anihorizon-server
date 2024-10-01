import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    const id = '74c2b9e0-5cb9-459e-9afd-3bbd1e74e0bf';
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  remove() {}
}
