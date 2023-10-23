import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from '../../core/providers/user.providers';
import { PasswordHasherService } from 'src/utilities/password-hasher';

@Module({
  controllers: [UsersController],
  providers: [PasswordHasherService, UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
