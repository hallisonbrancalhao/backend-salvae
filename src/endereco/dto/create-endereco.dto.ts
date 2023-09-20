import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cep: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  complemento: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rua: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  logradouro: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pais: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coordenadas: string;
}
