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

  async signIn(cpf: number, senha: string): Promise<any> {
    const user = await this.userService.findUser(cpf);
    const validPassword: boolean = await bcrypt.compare(senha, user.senha);

    if (!validPassword) throw new UnauthorizedException();

    const payload = {
      cpf: user.CPF,
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { senha, user },
    };
  }
}
