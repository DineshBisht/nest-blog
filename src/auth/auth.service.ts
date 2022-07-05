import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) return null;

    await this.varifyPassword(password, user.password);
    const payLoad = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payLoad),
    };
  }

  private async varifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatched) {
      throw new HttpException(
        'Wrong credentails matched',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
