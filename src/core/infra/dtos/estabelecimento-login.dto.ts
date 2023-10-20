import { IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EstabelecimentoLoginDto {
  @ApiProperty()
  @IsString({ message: 'O CNPJ precisa ser válido' })
  cnpj: string;

  @ApiProperty()
  senha: string;
}
