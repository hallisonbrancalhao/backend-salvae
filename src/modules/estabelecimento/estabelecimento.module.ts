import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { estabelecimentoProviders } from '../../core/providers/estabelecimento.providers';

@Module({
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService, ...estabelecimentoProviders],
  exports: [EstabelecimentoService, ...estabelecimentoProviders],
})
export class EstabelecimentoModule {}
