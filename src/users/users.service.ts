import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const emailAlreadyExist = await this.findOne(createUserDto.email);
    if (emailAlreadyExist)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(newUser);
    } catch (ex) {
      throw new HttpException(ex.message, HttpStatus.BAD_GATEWAY);
    }
  }

  findOne(email: string) {
    try {
      return this.usersRepository.findOne({ where: { email } });
    } catch (ex) {
      throw new HttpException('Server exception', ex.message);
    }
  }
  getById(userId: number) {
    try {
      return this.usersRepository.findOne({ where: { id: userId } });
    } catch (ex) {
      console.log(ex);
    }
  }
}
