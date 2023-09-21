import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @Inject('ENDERECO_REPOSITORY')
    private readonly enderecoRepository: Repository<Endereco>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto) {
    return await this.enderecoRepository.save(createEnderecoDto);
  }

  findAll() {
    return this.enderecoRepository.find({
      select: ['logradouro', 'numero', 'bairro', 'cidade', 'estado', 'cep'],
    });
  }

  findOne(id: number) {
    return this.enderecoRepository.findOne({
      where: { id },
      select: ['logradouro', 'numero', 'bairro', 'cidade', 'estado', 'cep'],
    });
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    await this.enderecoRepository.update(id, updateEnderecoDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.enderecoRepository.softDelete(id);
  }
}
