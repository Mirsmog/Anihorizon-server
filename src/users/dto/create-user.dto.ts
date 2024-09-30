import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @ApiProperty({ example: 'Joe' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'joe@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: 'secret123' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: null })
  avatar?: string;
}
