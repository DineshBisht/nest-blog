import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'This field contains string value',
    example: 'Lorem ipsum',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
