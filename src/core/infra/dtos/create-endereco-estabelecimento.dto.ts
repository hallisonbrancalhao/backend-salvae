import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateEnderecoEstabelecimentoDto {
  @ApiProperty()
  @IsNumber({}, { message: 'O CEP deve ser um número' })
  @IsNotEmpty({ message: 'O CEP deve ser preenchido' })
  cep: string;

  @ApiProperty({ required: false })
  @IsString()
  complemento: string | null;

  @ApiProperty()
  @IsString({ message: 'O número deve ser uma string' })
  @IsNotEmpty({ message: 'O número deve ser preenchido' })
  numero: string;

  @ApiProperty()
  @IsString({ message: 'O logradouro deve ser uma string' })
  logradouro: string;

  @ApiProperty()
  @IsString({ message: 'O bairro deve ser uma string' })
  @IsNotEmpty({ message: 'O bairro deve ser preenchido' })
  bairro: string;

  @ApiProperty()
  @IsString({ message: 'A cidade deve ser uma string' })
  @IsNotEmpty({ message: 'A cidade deve ser preenchida' })
  cidade: string;

  @ApiProperty()
  @IsString({ message: 'O estado deve ser uma string' })
  @IsNotEmpty({ message: 'O estado deve ser preenchido' })
  estado: string;

  @ApiProperty()
  @IsString({ message: 'O país deve ser uma string' })
  @IsNotEmpty({ message: 'O país deve ser preenchido' })
  pais: string;
}
