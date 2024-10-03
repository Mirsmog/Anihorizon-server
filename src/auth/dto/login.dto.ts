import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'john@gmail.com' })
  email: string;
  @IsString()
  @ApiProperty({ example: 'secret123' })
  password: string;
}
