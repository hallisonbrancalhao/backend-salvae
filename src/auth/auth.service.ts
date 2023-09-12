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
    const user = await this.userService.findUser(email);
    const validPassword: boolean = await bcrypt.compare(senha, user.password);
    console.log('AuthService : signIn : validPassword:', validPassword);

    if (!validPassword) throw new UnauthorizedException();

    const payload = {
      cpf: user.cpf,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
