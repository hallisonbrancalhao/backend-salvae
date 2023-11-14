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
import { CupomEncontradoDto } from 'src/core/infra/dtos/find-by-code.dto';

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

  async findAll(): Promise<Cupom[]> {
    return await this.cupomRepository.find();
  }

  async findByUser(id: string): Promise<Partial<CupomEncontradoDto>[]> {
    const user = await this.userRepository.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const cupom = await this.cupomRepository.find({
      where: { user: { id: user.id } },
      relations: ['promocao', 'user'],
    });

    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }

    return cupom.map((cupom) => ({
      id: cupom.id,
      idPromocao: cupom.promocao.id,
      codigo: cupom.codigo,
      dataValidade: cupom.dataValidade,
      status: cupom.status,
    }));
  }

  async findByPromocao(id: string): Promise<Cupom[]> {
    const promocao = await this.promocaoRepository.findOne({
      where: { id: Number(id) },
    });

    if (!promocao) {
      throw new Error('Promocao não encontrado');
    }

    return await this.cupomRepository.find({
      where: { user: { id: promocao.id } },
    });
  }

  async findByCodigo(codigo: string): Promise<CupomEncontradoDto> {
    const cupom = await this.cupomRepository.findOne({
      where: { codigo: codigo },
      relations: ['promocao', 'user'],
    });

    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }

    return {
      id: cupom.id,
      idPromocao: cupom.promocao.id,
      codigo: cupom.codigo,
      dataValidade: cupom.dataValidade,
      status: cupom.status,
      promocao: cupom.promocao,
      user: cupom.user,
    };
  }

  async desativar({ codigo }: { codigo: string }) {
    const cupom = await this.cupomRepository.findOne({
      where: { codigo: codigo },
    });

    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }

    await this.cupomRepository.update(cupom.id, {
      status: StatusCupom.INATIVO,
    });

    return {
      status: 200,
      description: 'Cupom desativado com sucesso.',
    };
  }

  async ativar({ codigo }: { codigo: string }) {
    const cupom = await this.cupomRepository.findOne({
      where: { codigo: codigo },
    });

    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }

    await this.cupomRepository.update(cupom.id, {
      status: StatusCupom.ATIVO,
    });

    return {
      status: 200,
      description: 'Cupom ativado com sucesso.',
    };
  }

  async delete(id: string) {
    const cupom = await this.cupomRepository.findOne({
      where: { id: Number(id) },
    });

    if (!cupom) {
      throw new Error('Cupom não encontrado');
    }

    await this.cupomRepository.remove(cupom);

    return {
      status: 200,
      description: 'Cupom deletado com sucesso.',
    };
  }
}
