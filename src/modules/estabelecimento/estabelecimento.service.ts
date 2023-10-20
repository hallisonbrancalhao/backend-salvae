import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Inject, Injectable } from '@nestjs/common';
import {
  Estabelecimento,
  EnderecoEstabelecimento,
  CreateEstabelecimentoDto,
  UpdateEstabelecimentoDto,
  Coordenadas,
  Mapa,
} from 'src/core/infra';
import { getCoordinates } from 'src/utilities';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @Inject('ESTABELECIMENTO_REPOSITORY')
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
    @Inject('ENDERECO_ESTABELECIMENTO_REPOSITORY')
    private readonly enderecoRepository: Repository<EnderecoEstabelecimento>,
    @Inject('COORDENADAS')
    private readonly coordenadasRepository: Repository<Coordenadas>,
    @Inject('MAPA')
    private readonly mapaRepository: Repository<Mapa>,
  ) {}

  async create(createEstabelecimentoDto: CreateEstabelecimentoDto) {
    const hashedPass = await this.userHash(createEstabelecimentoDto.senha);
    createEstabelecimentoDto.senha = hashedPass;

    const { endereco, ...dataEstabelecimento } = createEstabelecimentoDto;

    const getCoordenadas = await getCoordinates(endereco.cep, endereco.numero);

    const coordenadasEntity = this.coordenadasRepository.create({
      latitude: getCoordenadas.latitude,
      longitude: getCoordenadas.longitude,
    });
    const enderecoEntity = this.enderecoRepository.create({
      ...endereco,
    });
    const estabelecimentoEntity = this.estabelecimentoRepository.create({
      ...dataEstabelecimento,
      coordenadas: coordenadasEntity,
      endereco: enderecoEntity,
    });

    const mapaEntity = this.mapaRepository.create({
      coordenadas: coordenadasEntity,
    });

    await this.coordenadasRepository.save(coordenadasEntity);
    await this.enderecoRepository.save(enderecoEntity);
    await this.mapaRepository.save(mapaEntity);
    return await this.estabelecimentoRepository.save(estabelecimentoEntity);
  }

  async findAll() {
    return await this.estabelecimentoRepository.find({
      select: [
        'nome',
        'cnpj',
        'instagram',
        'whatsapp',
        'endereco',
        'fotoCapa',
        'fotoPerfil',
      ],
      relations: ['endereco'],
    });
  }

  findOne(cnpj: string) {
    return this.estabelecimentoRepository.findOne({
      where: { cnpj },
      select: [
        'nome',
        'cnpj',
        'instagram',
        'whatsapp',
        'endereco',
        'fotoCapa',
        'fotoPerfil',
      ],
      relations: ['endereco'],
    });
  }

  findUser(cnpj: string) {
    return this.estabelecimentoRepository.findOne({
      where: { cnpj },
      relations: ['endereco'],
    });
  }

  async update(
    cnpj: string,
    updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    await this.estabelecimentoRepository.update(cnpj, updateEstabelecimentoDto);
    return this.findOne(cnpj);
  }

  delete(cnpj: string) {
    return this.estabelecimentoRepository.softDelete({ cnpj });
  }

  private async userHash(pass: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltOrRounds);
    return hashedPass;
  }
}
