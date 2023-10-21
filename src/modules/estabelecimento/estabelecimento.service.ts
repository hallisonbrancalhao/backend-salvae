import { DataSource, In, Repository } from 'typeorm';
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
import { GeocodingService } from 'src/utilities';

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
    @Inject('DATABASE_CONNECTION')
    private readonly myDataSource: DataSource,
    private readonly geocodingService: GeocodingService,
  ) {}

  async create(createEstabelecimentoDto: CreateEstabelecimentoDto) {
    const { endereco, ...dataEstabelecimento } = createEstabelecimentoDto;

    const { latitude, longitude } = await this.geocodingService.getCoordinates(
      endereco.cep,
      endereco.numero,
    );
    const hashedPass = await bcrypt.hash(createEstabelecimentoDto.senha, 10);
    dataEstabelecimento.senha = hashedPass;

    const coordenadasEntity = this.coordenadasRepository.create({
      latitude,
      longitude,
    });

    const enderecoEntity = this.enderecoRepository.create(endereco);
    console.log(
      'EstabelecimentoService : create : enderecoEntity:',
      enderecoEntity,
    );

    const estabelecimentoEntity = this.estabelecimentoRepository.create({
      ...dataEstabelecimento,
      coordenadas: coordenadasEntity,
      endereco: enderecoEntity,
    });
    console.log(
      'EstabelecimentoService : create : estabelecimentoEntity:',
      estabelecimentoEntity,
    );

    const coordenadasMapaEntity = this.mapaRepository.create(coordenadasEntity);

    const mapaEntity = this.mapaRepository.create({
      coordenadas: coordenadasMapaEntity,
    });
    console.log('EstabelecimentoService : create : mapaEntity:', mapaEntity);

    await this.myDataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(estabelecimentoEntity);
      await transactionalEntityManager.save(mapaEntity);
    });

    return estabelecimentoEntity;
  }

  async findAll() {
    return await this.estabelecimentoRepository
      .createQueryBuilder('estabelecimento')
      .select([
        'estabelecimento.nome',
        'estabelecimento.cnpj',
        'estabelecimento.instagram',
        'estabelecimento.whatsapp',
        'estabelecimento.fotoCapa',
        'estabelecimento.fotoPerfil',
        'endereco',
      ])
      .leftJoin('estabelecimento.endereco', 'endereco')
      .orderBy('estabelecimento.nome')
      .getMany();
  }

  async findOne(cnpj: string) {
    return await this.estabelecimentoRepository
      .createQueryBuilder('estabelecimento')
      .select([
        'estabelecimento.nome',
        'estabelecimento.cnpj',
        'estabelecimento.instagram',
        'estabelecimento.whatsapp',
        'estabelecimento.fotoCapa',
        'estabelecimento.fotoPerfil',
        'endereco',
      ])
      .leftJoin('estabelecimento.endereco', 'endereco')
      .where('estabelecimento.cnpj = :cnpj', { cnpj })
      .getOneOrFail();
  }

  async update(
    cnpj: string,
    updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    const estabelecimentoEntity = await this.findOne(cnpj);
    const { endereco, ...dataEstabelecimento } = updateEstabelecimentoDto;

    if (endereco) {
      const { latitude, longitude } =
        await this.geocodingService.getCoordinates(
          endereco.cep,
          endereco.numero,
        );
      const coordenadasEntity = this.coordenadasRepository.create({
        latitude,
        longitude,
      });
      const enderecoEntity = this.enderecoRepository.create(endereco);
      estabelecimentoEntity.endereco = enderecoEntity;
      estabelecimentoEntity.coordenadas = coordenadasEntity;
      await this.coordenadasRepository.save(coordenadasEntity);
      await this.enderecoRepository.save(enderecoEntity);
    }

    Object.assign(estabelecimentoEntity, dataEstabelecimento);
    await this.estabelecimentoRepository.save(estabelecimentoEntity);

    return estabelecimentoEntity;
  }

  async delete(cnpj: string) {
    return await this.estabelecimentoRepository.softDelete({ cnpj });
  }
}
