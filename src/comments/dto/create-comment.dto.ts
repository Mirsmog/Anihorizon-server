import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  @ApiProperty({
    example: 'Some very cool comment!',
    description: 'The content of the comment.',
  })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'attack-on-titan-112',
    description: 'ID of the anime to which this comment belongs.',
  })
  animeId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'onee-twoo-thre-four',
    description:
      'ID of the parent comment, if this comment is a reply to another comment. Leave blank if it is a top-level comment.',
  })
  parentId?: string;
}

export class CreateCommentWithUserIdDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  @ApiProperty({
    example: 'Some very cool comment!',
    description: 'The content of the comment.',
  })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'attack-on-titan-112',
    description: 'ID of the anime to which this comment belongs.',
  })
  animeId: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'onee-twoo-thre-four',
    description:
      'ID of the parent comment, if this comment is a reply to another comment. Leave blank if it is a top-level comment.',
  })
  parentId?: string;
}
