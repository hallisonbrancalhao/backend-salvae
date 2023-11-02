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
import { DataSource, In, Repository } from 'typeorm';

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
    const promocoes = await this.promocaoRepository
      .createQueryBuilder('pr')
      .innerJoinAndSelect('pr.promocaoCategoria', 'pcp')
      .innerJoinAndSelect('pr.promocaoDia', 'prd')
      .innerJoinAndSelect('pcp.categoriaPromocao', 'cp')
      .innerJoinAndSelect('prd.dia', 'df')
      .innerJoinAndSelect('pr.estabelecimento', 'es')
      .innerJoinAndSelect('es.endereco', 'en')
      .leftJoinAndSelect('es.estabelecimentoCategoria', 'ec')
      .getMany();

    return promocoes.map((promocao) => ({
      id: promocao.id,
      descricao: promocao.descricao,
      promocaoDia: promocao.promocaoDia.map((pd) => pd.dia.dia),
      promocaoCategoria: promocao.promocaoCategoria.map(
        (pc) => pc.categoriaPromocao.nome,
      ),
      estabelecimento: {
        ...promocao.estabelecimento,
        endereco: promocao.estabelecimento.endereco,
      },
    }));
  }

  async findOne(id: string) {
    const promocao = await this.promocaoRepository
      .createQueryBuilder('pr')
      .innerJoinAndSelect('pr.promocaoCategoria', 'pcp')
      .innerJoinAndSelect('pr.promocaoDia', 'prd')
      .innerJoinAndSelect('pcp.categoriaPromocao', 'cp')
      .innerJoinAndSelect('prd.dia', 'df')
      .innerJoinAndSelect('pr.estabelecimento', 'es')
      .innerJoinAndSelect('es.endereco', 'en')
      .leftJoinAndSelect('es.estabelecimentoCategoria', 'ec')
      .andWhere('pr.id = :id', { id })
      .getOne();

    return {
      id: promocao.id,
      descricao: promocao.descricao,
      promocaoDia: promocao.promocaoDia.map((pd) => pd.dia.dia),
      promocaoCategoria: promocao.promocaoCategoria.map(
        (pc) => pc.categoriaPromocao.nome,
      ),
      estabelecimento: {
        ...promocao.estabelecimento,
        endereco: promocao.estabelecimento.endereco,
      },
    };
  }

  //TODO: Finalizar implementação do update
  // async update(id: string, promocaoDto: UpdatePromocaoDto) {
  //   const promocaoEntity = await this.findOne(id);

  //   if (!promocaoEntity) {
  //     throw new NotFoundException(`Promoção não encontrada com o id: ${id}`);
  //   }

  //   const { promocaoCategoria, promocaoDia } = promocaoEntity;
  //   console.log(
  //     'PromocaoService : update : promocaoCategoria:',
  //     promocaoCategoria,
  //   );

  //   const oldCategorias = await this.promocaoCategoriaPromocao.find({
  //     where: { promocao: In([promocaoCategoria]) },
  //   });
  //   console.log('PromocaoService : update : oldCategorias:', oldCategorias);
  // }

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
