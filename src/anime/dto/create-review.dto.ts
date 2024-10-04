import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'dxd-for-the-school' })
  animeId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({ example: 5 })
  value: number;
}

export class CreateReviewDtoWithUserId {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'dxd-for-the-school' })
  animeId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: 'some-user-uuid-fsdf' })
  userId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  @ApiProperty({ example: 5 })
  value: number;
}
