import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class FindUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
