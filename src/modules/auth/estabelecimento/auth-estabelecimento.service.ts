import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EnderecoEstabelecimento } from 'src/core/infra/entities/endereco-estabelecimento.entity';
import { EstabelecimentoService } from 'src/modules/estabelecimento/estabelecimento.service';

interface Payload {
  cnpj: string;
  nome: string;
  endereco?: EnderecoEstabelecimento;
}

export interface Response {
  access_token: string;
  estabelecimento: Payload;
}
@Injectable()
export class AuthEstabelecimentoService {
  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    cnpj: string,
    senha: string,
  ): Promise<Response | UnauthorizedException> {
    try {
      const estabelecimento =
        await this.estabelecimentoService.findByCnpj(cnpj);
      const validPassword: boolean = await bcrypt.compare(
        senha,
        estabelecimento.senha,
      );

      if (!validPassword) throw new UnauthorizedException();

      const payload = {
        id: estabelecimento.id,
        cnpj: estabelecimento.cnpj,
        nome: estabelecimento.nome,
        role: estabelecimento.role,
        endereco: estabelecimento?.endereco,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        estabelecimento: payload,
      };
    } catch (error) {
      return new BadRequestException({ message: error.message });
    }
  }
}
