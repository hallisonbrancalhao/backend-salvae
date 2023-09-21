import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, senha: string): Promise<any> {
    try {
      const user = await this.userService.findUser(email);
      const validPassword: boolean = await bcrypt.compare(senha, user.senha);

      if (!validPassword) throw new UnauthorizedException();

      const payload = {
        cpf: user.CPF,
        nome: user.nome,
        sobrenome: user.sobrenome,
        email: user.email,
        endereco: user?.endereco,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        user: payload,
      };
    } catch (error) {
      return new UnauthorizedException();
    }
  }
}
