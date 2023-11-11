import { Module } from '@nestjs/common';
import { CupomController } from './cupom.controller';
import { CupomService } from './cupom.service';
import {
  cupomProviders,
  promocaoProviders,
  usersProviders,
} from '../../core/providers';
import { DataSource } from 'typeorm';

@Module({
  controllers: [CupomController],
  providers: [
    CupomService,
    ...cupomProviders,
    ...usersProviders,
    ...promocaoProviders,
    {
      provide: DataSource,
      useFactory: (dataSource: DataSource) => dataSource,
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class CupomModule {}
