import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { mapping } from '../common/helper/mapping.helper';
import { User } from '../common/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({username});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(8);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const user = mapping(new User(), createUserDto);
    const {password, ...newUser} =  await this.userRepository.save(user);

    return newUser;
  }

}
