import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoriaPromocao,
  CreatePromocaoDto,
  DiaFuncionamento,
  Estabelecimento,
  Promocao,
  PromocaoCategoriaPromocao,
  PromocaoDia,
  UpdatePromocaoDto,
} from 'src/core/infra';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class PromocaoService {
  constructor(
    @Inject('ESTABELECIMENTO_REPOSITORY')
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
    @Inject('PROMOCAO')
    private readonly promocaoRepository: Repository<Promocao>,
    @Inject('PROMOCAO_CATEGORIA_PROMOCAO')
    private readonly promocaoCategoriaPromocao: Repository<PromocaoCategoriaPromocao>,
    private readonly connection: DataSource,
  ) {}

  async create(promocaoDto: CreatePromocaoDto) {
    const estabelecimento = await this.findEstablishmentById(
      promocaoDto.idEstabelecimento,
    );
    return await this.createPromotionWithRelations(
      promocaoDto,
      estabelecimento,
    );
  }

  async findAll() {
    const promocoes = await this.promocaoRepository.find({
      relations: [
        'promocaoCategoria',
        'promocaoCategoria.categoriaPromocao',
        'promocaoDia.dia',
        'estabelecimento',
        'estabelecimento.endereco',
        'estabelecimento.estabelecimentoCategoria',
      ],
    });

    return promocoes.map((promocao) => ({
      ...promocao,
      promocaoCategoria: promocao.promocaoCategoria.map(
        (pc) => pc.categoriaPromocao,
      ),
      promocaoDia: promocao.promocaoDia.map((pd) => pd.dia.dia),
      estabelecimento: {
        ...promocao.estabelecimento,
        endereco: promocao.estabelecimento.endereco,
      },
    }));
  }

  async findOne(id: string) {
    const promocao = await this.promocaoRepository
      .createQueryBuilder('pr')
      .leftJoinAndSelect('pr.promocaoCategoria', 'pcp')
      .leftJoinAndSelect('pr.promocaoDia', 'prd')
      .leftJoinAndSelect('pcp.categoriaPromocao', 'cp')
      .leftJoinAndSelect('prd.dia', 'df')
      .leftJoinAndSelect('pr.estabelecimento', 'es')
      .leftJoinAndSelect('es.endereco', 'en')
      .leftJoinAndSelect('es.estabelecimentoCategoria', 'ec')
      .andWhere('pr.id = :id', { id })
      .getOne();

    return {
      id: promocao.id,
      descricao: promocao.descricao,
      promocaoDia: promocao.promocaoDia.map((pd) => pd.dia.dia),
      promocaoCategoria: promocao.promocaoCategoria.map(
        (pc) => pc.categoriaPromocao,
      ),
      estabelecimento: {
        ...promocao.estabelecimento,
        endereco: promocao.estabelecimento.endereco,
      },
    };
  }

  async update(id: number, updatePromocaoDto: UpdatePromocaoDto) {
    const promocaoEntity = await this.promocaoRepository.findOne({
      where: { id },
      relations: ['promocaoCategoria', 'promocaoDia', 'estabelecimento'],
    });

    if (!promocaoEntity) {
      throw new NotFoundException(`Promoção não encontrada com o id: ${id}`);
    }

    const { promocaoDia, promocaoCategoria, ...promocaoData } =
      updatePromocaoDto;

    Object.assign(promocaoEntity, promocaoData);

    if (promocaoDia) {
      await this.connection.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.delete(PromocaoDia, {
          promocao: promocaoEntity.id,
        });

        promocaoEntity.promocaoDia = await Promise.all(
          promocaoDia.map(async (pd) => {
            const dia = await transactionalEntityManager.findOne(
              DiaFuncionamento,
              { where: { id: pd.idDiaFuncionamento } },
            );
            return transactionalEntityManager.create(PromocaoDia, {
              ...pd,
              dia,
            });
          }),
        );
      });
    }

    if (promocaoCategoria) {
      await this.connection.transaction(async (transactionalEntityManager) => {
        promocaoEntity.promocaoCategoria = await Promise.all(
          promocaoCategoria.map(async (pc) => {
            const categoriaPromocao = await transactionalEntityManager.findOne(
              CategoriaPromocao,
              {
                where: { id: pc.idCategoriaPromocao },
              },
            );
            return transactionalEntityManager.create(
              PromocaoCategoriaPromocao,
              {
                ...pc,
                categoriaPromocao,
              },
            );
          }),
        );
      });
    }

    await this.promocaoRepository.save(promocaoEntity);

    return promocaoEntity;
  }

  async delete(id: string) {
    const promocao = await this.findOne(id);
    if (!promocao) {
      throw new NotFoundException(`Promoção não encontrada com o id: ${id}`);
    }

    await this.connection.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(PromocaoCategoriaPromocao, {
        promocao: promocao.id,
      });
      await transactionalEntityManager.delete(PromocaoDia, {
        promocao: promocao.id,
      });
      await transactionalEntityManager.delete(Promocao, {
        id: promocao.id,
      });
    });
  }

  private async findEstablishmentById(id: number) {
    const estabelecimento = await this.estabelecimentoRepository.findOne({
      where: { id },
    });
    if (!estabelecimento) {
      throw new NotFoundException(
        `Estabelecimento não encontrado com o id: ${id}`,
      );
    }
    return estabelecimento;
  }

  private async createPromotionWithRelations(
    promocaoDto: CreatePromocaoDto,
    estabelecimento: Estabelecimento,
  ) {
    return await this.connection.transaction(
      async (transactionalEntityManager) => {
        const novaPromocao = transactionalEntityManager.create(Promocao, {
          ...promocaoDto,
          estabelecimento: estabelecimento,
        });
        const savedPromocao = await transactionalEntityManager.save(
          Promocao,
          novaPromocao,
        );

        const savedPromocaoCategoria = await transactionalEntityManager.save(
          PromocaoCategoriaPromocao,
          await Promise.all(
            promocaoDto.promocaoCategoria.map(async (pc) => {
              console.log(
                'PromocaoService : promocaoDto.promocaoCategoria.map : promocaoCategoria:',
                pc,
              );
              const categoriaPromocao =
                await transactionalEntityManager.findOne(CategoriaPromocao, {
                  where: { id: pc.idCategoriaPromocao },
                });
              return {
                ...pc,
                promocao: savedPromocao,
                categoriaPromocao: categoriaPromocao,
              };
            }),
          ),
        );

        const savedPromocaoDia = await transactionalEntityManager.save(
          PromocaoDia,
          await Promise.all(
            promocaoDto.promocaoDia.map(async (pd) => {
              const promocaoDia = await transactionalEntityManager.findOne(
                DiaFuncionamento,
                {
                  where: { id: pd.idDiaFuncionamento },
                },
              );
              return {
                ...pd,
                promocao: savedPromocao,
                dia: promocaoDia,
              };
            }),
          ),
        );

        return {
          ...savedPromocao,
          promocaoCategoria: savedPromocaoCategoria,
          promocaoDia: savedPromocaoDia,
        };
      },
    );
  }
}
