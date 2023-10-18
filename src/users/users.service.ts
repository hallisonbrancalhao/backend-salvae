import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { Inject, Injectable } from '@nestjs/common';
import { Endereco } from './entities/endereco.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ENDERECO_REPOSITORY')
    private readonly enderecoRepository: Repository<Endereco>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPass = await this.userHash(createUserDto.senha);
    createUserDto.senha = hashedPass;

    const { endereco, ...dataUser } = createUserDto;

    const newUser = this.userRepository.create(dataUser);
    const userCreated = await this.userRepository.save(newUser);

    const newEndereco = this.enderecoRepository.create({
      ...endereco,
      user: userCreated,
    });

    return await this.enderecoRepository.save(newEndereco);
  }

  async findAll() {
    return await this.userRepository.find({
      select: [
        'nome',
        'sobrenome',
        'email',
        'CPF',
        'dataNascimento',
        'telefone',
        'endereco',
      ],
      relations: ['endereco'],
    });
  }

  findOne(email: string) {
    return this.userRepository.find({
      where: { email },
      select: [
        'nome',
        'sobrenome',
        'email',
        'CPF',
        'telefone',
        'dataNascimento',
        'endereco',
      ],
      relations: ['endereco'],
    });
  }

  findUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['endereco'],
    });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(email, updateUserDto);
    return this.findOne(email);
  }

  delete(email: string) {
    return this.userRepository.softDelete({ email });
  }

  private async userHash(pass: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltOrRounds);
    return hashedPass;
  }
}
