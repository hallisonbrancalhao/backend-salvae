import { DataSource } from 'typeorm';
import { User } from './entities/users.entity';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];
