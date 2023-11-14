import { Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { User, Endereco, CreateUserDto, UpdateUserDto } from 'src/core/infra';
import { PasswordHasherService } from 'src/utilities/password-hasher';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    @Inject('ENDERECO_REPOSITORY')
    private readonly enderecoRepository: Repository<Endereco>,
    private readonly hasher: PasswordHasherService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { endereco, ...dataUser } = createUserDto;

    const hashedPass = await this.hasher.hashPassword(createUserDto.senha);
    dataUser.senha = hashedPass;

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
        'id',
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

  async findOne(id: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.nome',
        'user.sobrenome',
        'user.email',
        'user.CPF',
        'user.dataNascimento',
        'user.telefone',
        'endereco',
      ])
      .leftJoin('user.endereco', 'endereco')
      .where('user.id = :id', { id })
      .getOneOrFail();
  }

  async findUser(id: string) {
    return await this.userRepository.findOne({
      where: { id: Number(id) },
      relations: ['endereco'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userEntity = await this.findOne(id);
    const { endereco, ...dataUser } = updateUserDto;

    if (endereco) {
      const enderecoEntity = this.enderecoRepository.create(endereco);
      userEntity.endereco = enderecoEntity;
      await this.enderecoRepository.save(enderecoEntity);
    }

    Object.assign(userEntity, dataUser);
    await this.userRepository.update({ id: Number(id) }, userEntity);

    return userEntity;
  }

  async delete(id: string) {
    try {
      const userEntity = await this.findOne(id);
      await this.userRepository.remove(userEntity);
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      return {
        erro: 'Não foi possível deletar o estabelecimento' + error.message,
      };
    }
  }
}
