import { Module } from '@nestjs/common';
import { promocaoProviders } from '../../core/providers/promocao.providers';
import { PromocaoService } from './promocao.service';
import { PromocaoController } from './promocao.controller';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { estabelecimentoProviders } from 'src/core/providers';

@Module({
  imports: [EstabelecimentoModule],
  providers: [
    ...promocaoProviders,
    ...estabelecimentoProviders,
    PromocaoService,
  ],
  controllers: [PromocaoController],
})
export class PromocaoModule {}
