import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoriaPromocao,
  CreatePromocaoDto,
  DiaFuncionamento,
  Estabelecimento,
  Promocao,
  PromocaoCategoriaPromocao,
  PromocaoDia,
} from 'src/core/infra';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PromocaoService {
  constructor(
    @Inject('ESTABELECIMENTO_REPOSITORY')
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
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
