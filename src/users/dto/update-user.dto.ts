import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @ApiProperty({ example: 'John' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'john@gmail.com' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty({ example: 'secret123' })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: null })
  avatar?: string;
}
