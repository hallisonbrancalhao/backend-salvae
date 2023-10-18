import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEstabelecimentoDto {
  @ApiProperty({ example: '12345671-0001' })
  @IsNumber({}, { message: 'O CNPJ deve ser um número' })
  @IsNotEmpty({ message: 'O CNPJ deve ser preenchido' })
  cnpj: number;

  @ApiProperty()
  @IsOptional()
  complemento: string;

  @ApiProperty({ example: '123 B' })
  @IsString({ message: 'O número deve ser uma string' })
  @IsNotEmpty({ message: 'O número deve ser preenchido' })
  numero: string;

  @ApiProperty({ example: 'Avenida Brasil' })
  @IsOptional({ message: 'O estado deve ser preenchido' })
  @IsString({ message: 'O estado deve ser uma string' })
  logradouro: string;

  @ApiProperty({ example: 'Centro' })
  @IsString({ message: 'O bairro deve ser uma string' })
  @IsNotEmpty({ message: 'O bairro deve ser preenchido' })
  bairro: string;

  @ApiProperty({ example: 'Maringá' })
  @IsString({ message: 'A cidade deve ser uma string' })
  @IsNotEmpty({ message: 'A cidade deve ser preenchida' })
  cidade: string;

  @ApiProperty({ example: 'Paraná' })
  @IsString({ message: 'O estado deve ser uma string' })
  @IsNotEmpty({ message: 'O estado deve ser preenchido' })
  estado: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString({ message: 'O país deve ser uma string' })
  @IsNotEmpty({ message: 'O país deve ser preenchido' })
  pais: string;

  @ApiProperty({ example: '-23.420999, -51.933056' })
  @IsOptional()
  @IsString({ message: 'As coordenadas devem ser uma string' })
  coordenadas: string;
}
