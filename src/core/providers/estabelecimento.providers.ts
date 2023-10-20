import { DataSource } from 'typeorm';
import { Estabelecimento } from '../infra/entities/estabelecimento.entity';
import { EnderecoEstabelecimento } from '../infra/entities/endereco-estabelecimento.entity';
import { Coordenadas, Mapa } from '../infra';

export const estabelecimentoProviders = [
  {
    provide: 'ESTABELECIMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Estabelecimento),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ENDERECO_ESTABELECIMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EnderecoEstabelecimento),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'COORDENADAS',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Coordenadas),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MAPA',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Mapa),
    inject: ['DATABASE_CONNECTION'],
  },
];
