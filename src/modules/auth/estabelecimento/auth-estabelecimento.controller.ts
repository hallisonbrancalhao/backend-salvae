import { Body, Post, HttpCode, Controller, HttpStatus } from '@nestjs/common';
import { AuthEstabelecimentoService } from './auth-estabelecimento.service';
import { EstabelecimentoLoginDto } from '../../../core/infra/dtos/estabelecimento-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login Estabelecimento')
@Controller('login/estabelecimento')
export class AuthEstabelecimentoController {
  constructor(private authService: AuthEstabelecimentoService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: EstabelecimentoLoginDto) {
    return this.authService.signIn(signInDto.cnpj, signInDto.senha);
  }
}
