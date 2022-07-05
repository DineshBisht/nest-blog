import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create.user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthenticationGuard } from './local.authentication.guard';
import * as bcrypt from 'bcrypt';
import { SerializeInterceptor } from 'src/interceptors/SerializeInterceptor';
import { UserDto } from 'src/users/dtos/User.dto';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
//@UseInterceptors(new SerializeInterceptor(UserDto))
//@ApiBearerAuth('defaultBearerAuth')
@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req) {
    return req.user;
  }

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    return await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
  }

  @UseGuards(JwtGuard)
  @Get('/profile')
  @ApiBearerAuth('defaultBearerAuth')
  profile(@Req() request) {
    return request.user;
  }
}
