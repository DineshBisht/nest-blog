import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dtos/find.user.dto';
import { UserDto } from './dtos/User.dto';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Give related user',
    type: UserDto,
  })
  async findOne(@Query() findUserDto: FindUserDto) {
    const user = await this.usersService.findOne(findUserDto.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      return await this.usersService.createUser({
        ...userDto,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
