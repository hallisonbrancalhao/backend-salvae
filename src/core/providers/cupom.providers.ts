import { DataSource } from 'typeorm';
import { Cupom } from '../infra/entities/cupom.entity';

export const cupomProviders = [
  {
    provide: 'CUPOM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cupom),
    inject: ['DATABASE_CONNECTION'],
  },
];
