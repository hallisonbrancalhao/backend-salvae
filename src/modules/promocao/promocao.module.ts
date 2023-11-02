import { Module } from '@nestjs/common';
import { promocaoProviders } from '../../core/providers/promocao.providers';
import { PromocaoService } from './promocao.service';
import { PromocaoController } from './promocao.controller';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { estabelecimentoProviders } from 'src/core/providers';
import { DataSource } from 'typeorm';

@Module({
  imports: [EstabelecimentoModule],
  providers: [
    ...promocaoProviders,
    ...estabelecimentoProviders,
    PromocaoService,
    {
      provide: DataSource,
      useFactory: (dataSource: DataSource) => dataSource,
      inject: ['DATABASE_CONNECTION'],
    },
  ],
  controllers: [PromocaoController],
})
export class PromocaoModule {}
