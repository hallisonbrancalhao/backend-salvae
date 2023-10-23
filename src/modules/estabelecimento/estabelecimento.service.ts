import { DataSource, In, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Inject, Injectable } from '@nestjs/common';
import {
  Estabelecimento,
  EnderecoEstabelecimento,
  CreateEstabelecimentoDto,
  UpdateEstabelecimentoDto,
  Coordenadas,
} from 'src/core/infra';
import { GeocodingService } from 'src/utilities';
import { PasswordHasherService } from 'src/utilities/password-hasher';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @Inject('ESTABELECIMENTO_REPOSITORY')
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
    @Inject('ENDERECO_ESTABELECIMENTO_REPOSITORY')
    private readonly enderecoRepository: Repository<EnderecoEstabelecimento>,
    @Inject('COORDENADAS')
    private readonly coordenadasRepository: Repository<Coordenadas>,
    @Inject('DATABASE_CONNECTION')
    private readonly myDataSource: DataSource,
    private readonly geocodingService: GeocodingService,
    private readonly hasher: PasswordHasherService,
  ) {}

  async create(createEstabelecimentoDto: CreateEstabelecimentoDto) {
    const { endereco, ...dataEstabelecimento } = createEstabelecimentoDto;

    const { latitude, longitude } = await this.geocodingService.getCoordinates(
      endereco.cep,
      endereco.numero,
    );

    const hashedPass = await this.hasher.hashPassword(
      createEstabelecimentoDto.senha,
    );
    dataEstabelecimento.senha = hashedPass;

    const coordenadasEntity = this.coordenadasRepository.create({
      latitude,
      longitude,
    });

    const enderecoEntity = this.enderecoRepository.create(endereco);

    const estabelecimentoEntity = this.estabelecimentoRepository.create({
      ...dataEstabelecimento,
      coordenadas: coordenadasEntity,
      endereco: enderecoEntity,
    });

    await this.myDataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(estabelecimentoEntity);
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
        'coordenadas',
      ])
      .leftJoin('estabelecimento.endereco', 'endereco')
      .leftJoin('estabelecimento.coordenadas', 'coordenadas')
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
        'estabelecimento.senha',
        'endereco',
        'coordenadas',
      ])
      .leftJoin('estabelecimento.endereco', 'endereco')
      .leftJoin('estabelecimento.coordenadas', 'coordenadas')
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
    await this.estabelecimentoRepository.update(
      { cnpj },
      estabelecimentoEntity,
    );

    return estabelecimentoEntity;
  }

  async delete(cnpj: string): Promise<Object> {
    try {
      const estabelecimentoEntity = await this.findOne(cnpj);
      await this.estabelecimentoRepository.remove(estabelecimentoEntity);
      return { message: 'Estabelecimento deletado com sucesso' };
    } catch (error) {
      return {
        erro: 'Não foi possível deletar o estabelecimento' + error.message,
      };
    }
  }
}
