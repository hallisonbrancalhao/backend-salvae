import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePromocaoDto,
  Estabelecimento,
  Promocao,
  PromocaoCategoriaPromocao,
  PromocaoDia,
} from 'src/core/infra';
import { Repository } from 'typeorm';

@Injectable()
export class PromocaoService {
  constructor(
    @Inject('PROMOCAO')
    private readonly promocaoRepository: Repository<Promocao>,
    @Inject('ESTABELECIMENTO_REPOSITORY')
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
    @Inject('PROMOCAO_CATEGORIA_PROMOCAO')
    private readonly promocaoCategoriaPromocaoRepository: Repository<PromocaoCategoriaPromocao>,
    @Inject('PROMOCAO_DIA')
    private readonly promocaoDiaRepository: Repository<PromocaoDia>,
  ) {}

  async create(promocaoDto: CreatePromocaoDto) {
    const {
      idEstabelecimento,
      promocaoCategoria,
      promocaoDia,
      ...promocaoData
    } = promocaoDto;

    // Encontra o estabelecimento relacionado
    const estabelecimento = await this.estabelecimentoRepository.findOne({
      where: { id: idEstabelecimento },
    });

    // Cria nova promoção
    const novaPromocao = this.promocaoRepository.create(promocaoData);
    novaPromocao.estabelecimento = estabelecimento;

    // Salva nova promoção
    const savedPromocao = await this.promocaoRepository.save(novaPromocao);

    // Cria e salva as relações de PromocaoCategoriaPromocao e PromocaoDia
    const savedPromocaoCategoria =
      await this.promocaoCategoriaPromocaoRepository.save(
        promocaoCategoria.map((pc) => ({ ...pc, promocao: savedPromocao })),
      );

    const savedPromocaoDia = await this.promocaoDiaRepository.save(
      promocaoDia.map((pd) => ({ ...pd, promocao: savedPromocao })),
    );

    return {
      ...savedPromocao,
      promocaoCategoria: savedPromocaoCategoria,
      promocaoDia: savedPromocaoDia,
    };
  }
}
