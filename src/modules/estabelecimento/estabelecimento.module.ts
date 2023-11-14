import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { estabelecimentoProviders } from '../../core/providers/estabelecimento.providers';
import { FtpService, GeocodingService } from 'src/utilities';
import { PasswordHasherService } from 'src/utilities/password-hasher';
import { ImagesService } from '../images/images.service';

@Module({
  controllers: [EstabelecimentoController],
  providers: [
    EstabelecimentoService,
    GeocodingService,
    PasswordHasherService,
    ImagesService,
    FtpService,
    ...estabelecimentoProviders,
  ],
  exports: [EstabelecimentoService, ...estabelecimentoProviders],
})
export class EstabelecimentoModule {}
