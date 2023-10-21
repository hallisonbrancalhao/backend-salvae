import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'O email precisa ser válido' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'A senha precisa ser válida' })
  senha: string;
}
