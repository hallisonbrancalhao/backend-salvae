import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { EnderecoModule } from 'src/endereco/endereco.module';

@Module({
  imports: [DatabaseModule, EnderecoModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
