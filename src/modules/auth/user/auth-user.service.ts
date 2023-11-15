import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Endereco } from 'src/core/infra/entities/endereco.entity';

interface Payload {
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  endereco?: Endereco;
}

export interface Response {
  access_token: string;
  usuario: Payload;
}
@Injectable()
export class AuthUserService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    senha: string,
  ): Promise<Response | BadRequestException> {
    try {
      const user = await this.userService.findUserbyEmail(email);
      const validPassword: boolean = await bcrypt.compare(senha, user.senha);

      if (!validPassword) throw new UnauthorizedException();

      const payload = {
        id: user.id,
        cpf: user.CPF,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        endereco: user?.endereco,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        usuario: payload,
      };
    } catch (error) {
      return new UnauthorizedException({ error: error });
    }
  }
}
