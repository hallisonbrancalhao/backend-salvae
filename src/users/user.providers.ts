import { DataSource } from 'typeorm';
import { User } from './entities/users.entity';
import { Endereco } from './entities/endereco.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ENDERECO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Endereco),
    inject: ['DATABASE_CONNECTION'],
  },
];
