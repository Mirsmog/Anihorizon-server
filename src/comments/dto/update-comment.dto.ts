import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'aaaa-bbbb-cccc-dddd',
    description: 'The id of the comment',
  })
  id: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(10000)
  @ApiProperty({
    example: 'Some very cool comment!',
    description: 'The content of the comment.',
  })
  content: string;
}
