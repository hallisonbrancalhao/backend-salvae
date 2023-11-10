import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EstabelecimentoLoginDto {
  @ApiProperty()
  @IsString({ message: 'O CNPJ precisa ser válido' })
  cnpj: string;

  @ApiProperty()
  @IsString({ message: 'A senha precisa ser válida' })
  senha: string;
}
