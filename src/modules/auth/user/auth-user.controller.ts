import { Body, Post, HttpCode, Controller, HttpStatus } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { UserLoginDto } from '../../../core/infra/dtos/user-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login Usuário')
@Controller('login/usuario')
export class AuthUserController {
  constructor(private authService: AuthUserService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: UserLoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.senha);
  }
}
