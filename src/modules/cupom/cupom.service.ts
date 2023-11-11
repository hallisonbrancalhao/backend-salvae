import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCupomDto,
  Promocao,
  User,
  Cupom,
  CupomValidateDto,
} from '../../core/infra';
import {
  generateToken,
  cupomExpiresDate,
  validateCupom,
} from '../../utilities';
import { DataSource, Repository } from 'typeorm';
import { StatusCupom } from 'src/core/enum/status-cupom.enum';

@Injectable()
export class CupomService {
  constructor(
    @Inject('CUPOM_REPOSITORY')
    private readonly cupomRepository: Repository<Cupom>,
    @Inject('PROMOCAO')
    private readonly promocaoRepository: Repository<Promocao>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly connection: DataSource,
  ) {}

  async create(createCupomDto: CreateCupomDto) {
    await this.connection.transaction(async (manager) => {
      const cupom = new Cupom();
      cupom.codigo = generateToken();
      cupom.dataValidade = cupomExpiresDate();
      const promocao = await manager.findOne(Promocao, {
        where: { id: createCupomDto.idPromocao },
      });

      if (!promocao) {
        throw new Error('Promoção não encontrada');
      }

      cupom.promocao = promocao;

      const user = await manager.findOne(User, {
        where: { id: createCupomDto.idUsuario },
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const alreadyCreated = await this.cupomRepository.findOne({
        where: { promocao: promocao, status: StatusCupom.ATIVO },
        relations: ['user'],
      });

      cupom.user = user;

      if (alreadyCreated) throw new Error('Cupom já cadastrado');
      return await manager.save(cupom);
    });
  }

  async validate(idPromocao: string, body: CupomValidateDto) {
    const cupom = await this.cupomRepository.findOne({
      where: { codigo: body.codigo },
      relations: ['promocao'],
    });

    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }

    if (validateCupom(idPromocao, cupom)) {
      await this.cupomRepository.update(cupom.id, {
        status: StatusCupom.UTILIZADO,
      });
      return {
        status: 200,
        description: 'Cupom validado com sucesso.',
      };
    }
  }
}
