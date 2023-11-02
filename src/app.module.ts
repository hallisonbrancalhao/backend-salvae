import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './modules/users/users.module';
import { AuthUserModule } from './modules/auth/user/auth-user.module';
import { DatabaseModule } from './database/database.module';
import { EstabelecimentoModule } from './modules/estabelecimento/estabelecimento.module';
import { AuthEstabelecimentoModule } from './modules/auth/estabelecimento/auth-estabelecimento.module';
import { PromocaoModule } from './modules/promocao/promocao.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    EstabelecimentoModule,
    AuthUserModule,
    AuthEstabelecimentoModule,
    PromocaoModule,
  ],
})
export class AppModule {}
