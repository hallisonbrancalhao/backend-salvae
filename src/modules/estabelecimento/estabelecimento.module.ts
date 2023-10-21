import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { estabelecimentoProviders } from '../../core/providers/estabelecimento.providers';
import { GeocodingService } from 'src/utilities';
import { PasswordHasherService } from 'src/utilities/password-hasher';

@Module({
  controllers: [EstabelecimentoController],
  providers: [
    EstabelecimentoService,
    GeocodingService,
    PasswordHasherService,
    ...estabelecimentoProviders,
  ],
  exports: [EstabelecimentoService, ...estabelecimentoProviders],
})
export class EstabelecimentoModule {}
