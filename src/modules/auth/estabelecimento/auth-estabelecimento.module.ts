import { Module } from '@nestjs/common';
import { AuthEstabelecimentoController } from './auth-estabelecimento.controller';
import { AuthEstabelecimentoService } from './auth-estabelecimento.service';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { EstabelecimentoService } from 'src/modules/estabelecimento/estabelecimento.service';
import { estabelecimentoProviders } from 'src/core/providers/estabelecimento.providers';
import { GeocodingService } from 'src/utilities';
import { PasswordHasherService } from 'src/utilities/password-hasher';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthEstabelecimentoController],
  providers: [
    GeocodingService,
    PasswordHasherService,
    AuthEstabelecimentoService,
    EstabelecimentoService,
    ...estabelecimentoProviders,
  ],
})
export class AuthEstabelecimentoModule {}
