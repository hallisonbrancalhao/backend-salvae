import { Promocao, PromocaoCategoriaPromocao, PromocaoDia } from '../infra';
import { DataSource } from 'typeorm';

export const promocaoProviders = [
  {
    provide: 'PROMOCAO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Promocao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PROMOCAO_CATEGORIA_PROMOCAO',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PromocaoCategoriaPromocao),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PROMOCAO_DIA',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PromocaoDia),
    inject: ['DATABASE_CONNECTION'],
  },
];
