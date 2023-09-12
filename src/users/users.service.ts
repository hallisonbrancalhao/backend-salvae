import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.userHash(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: ['firstName', 'lastName', 'email'],
    });
  }

  findOne(cpf: number) {
    return this.userRepository.find({
      where: { cpf: cpf },
      select: ['firstName', 'lastName', 'email'],
    });
  }

  findUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(cpf: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(cpf, updateUserDto);
    return this.findOne(cpf);
  }

  delete(id: string) {
    return this.userRepository.softDelete(id);
  }

  private async userHash(pass: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltOrRounds);
    return hashedPass;
  }
}
