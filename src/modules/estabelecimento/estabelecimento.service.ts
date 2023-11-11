import { DataSource, In, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Inject, Injectable } from '@nestjs/common';
import {
  Estabelecimento,
  EnderecoEstabelecimento,
  CreateEstabelecimentoDto,
  UpdateEstabelecimentoDto,
  Coordenadas,
  CategoriaEstabelecimento,
} from '../../core/infra';
import { GeocodingService } from '../../utilities';
import { PasswordHasherService } from '../../utilities/password-hasher';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @Inject('ESTABELECIMENTO_REPOSITORY')
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
    @Inject('ENDERECO_ESTABELECIMENTO_REPOSITORY')
    private readonly enderecoRepository: Repository<EnderecoEstabelecimento>,
    @Inject('COORDENADAS')
    private readonly coordenadasRepository: Repository<Coordenadas>,
    @Inject('CATEGORIA_ESTABELECIMENTO_REPOSITORY')
    private readonly categoriaRepository: Repository<CategoriaEstabelecimento>,
    @Inject('DATABASE_CONNECTION')
    private readonly connection: DataSource,
    private readonly geocodingService: GeocodingService,
    private readonly hasher: PasswordHasherService,
  ) {}

  async create(createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return await this.connection.transaction(
      async (transactionalEntityManager) => {
        const { endereco, estabelecimentoCategoria, ...dataEstabelecimento } =
          createEstabelecimentoDto;

        const { latitude, longitude } =
          await this.geocodingService.getCoordinates(
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

        const categoriaEntity = await this.categoriaRepository.findOne({
          where: { id: estabelecimentoCategoria },
        });

        const estabelecimentoEntity = this.estabelecimentoRepository.create({
          ...dataEstabelecimento,
          estabelecimentoCategoria: categoriaEntity,
          coordenadas: coordenadasEntity,
          endereco: enderecoEntity,
        });
        await transactionalEntityManager.save(estabelecimentoEntity);

        return estabelecimentoEntity;
      },
    );
  }

  async findAll() {
    return await this.estabelecimentoRepository
      .createQueryBuilder('estabelecimento')
      .select([
        'estabelecimento.id',
        'estabelecimento.nome',
        'estabelecimento.cnpj',
        'estabelecimento.instagram',
        'estabelecimento.whatsapp',
        'estabelecimento.fotoCapa',
        'estabelecimento.fotoPerfil',
        'categoria',
        'endereco',
        'coordenadas',
      ])
      .leftJoin('estabelecimento.endereco', 'endereco')
      .leftJoin('estabelecimento.coordenadas', 'coordenadas')
      .leftJoin('estabelecimento.estabelecimentoCategoria', 'categoria')
      .orderBy('estabelecimento.nome')
      .getMany();
  }

  async getAllCategorias() {
    return (await this.categoriaRepository.find()).map((categoria) => ({
      label: categoria.nome,
      value: categoria.id,
    }));
  }

  async findByCnpj(cnpj: string) {
    return this.estabelecimentoRepository
      .createQueryBuilder('estabelecimento')
      .select([
        'estabelecimento.id',
        'estabelecimento.nome',
        'estabelecimento.senha',
        'estabelecimento.cnpj',
        'estabelecimento.instagram',
        'estabelecimento.whatsapp',
        'estabelecimento.fotoCapa',
        'estabelecimento.fotoPerfil',
        'categoria',
        'endereco',
        'coordenadas',
      ])
      .leftJoin('estabelecimento.endereco', 'endereco')
      .leftJoin('estabelecimento.coordenadas', 'coordenadas')
      .leftJoin('estabelecimento.estabelecimentoCategoria', 'categoria')
      .where('estabelecimento.cnpj = :cnpj', { cnpj })
      .getOneOrFail();
  }

  async findOne(id: string) {
    return await this.estabelecimentoRepository
      .createQueryBuilder('estabelecimento')
      .select([
        'estabelecimento.id',
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
      .where('estabelecimento.id = :id', { id })
      .getOneOrFail();
  }

  async update(id: string, updateEstabelecimentoDto: UpdateEstabelecimentoDto) {
    const estabelecimentoEntity = await this.findOne(id);
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
      { id: estabelecimentoEntity.id },
      estabelecimentoEntity,
    );

    return estabelecimentoEntity;
  }

  async delete(id: string) {
    try {
      const estabelecimento = await this.findOne(id);
      await this.connection.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(Estabelecimento, id);
        await transactionalEntityManager.delete(EnderecoEstabelecimento, {
          id: estabelecimento.endereco.id,
        });
        await transactionalEntityManager.delete(Coordenadas, {
          id: estabelecimento.coordenadas.id,
        });
      });
      return { message: 'Estabelecimento excluído com sucesso.' };
    } catch (error) {
      return {
        erro: 'Não foi possível deletar o estabelecimento: ' + error.message,
      };
    }
  }
}
