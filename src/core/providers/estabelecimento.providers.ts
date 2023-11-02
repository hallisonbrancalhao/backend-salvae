import { DataSource } from 'typeorm';
import { Estabelecimento } from '../infra/entities/estabelecimento.entity';
import { EnderecoEstabelecimento } from '../infra/entities/endereco-estabelecimento.entity';
import { CategoriaEstabelecimento, Coordenadas } from '../infra';

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
    provide: 'CATEGORIA_ESTABELECIMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CategoriaEstabelecimento),
    inject: ['DATABASE_CONNECTION'],
  },
];
