import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBase64,
} from '@nestjs/class-validator';
import { CreateEnderecoEstabelecimentoDto } from './create-endereco-estabelecimento.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CoordenadasDto } from './coordenadas.dto';

export class CreateEstabelecimentoDto {
  @ApiProperty()
  @IsString({ message: 'O cnpj deve ser uma string' })
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty()
  senha: string;

  @ApiProperty({ type: CreateEnderecoEstabelecimentoDto, required: false })
  @IsOptional()
  endereco: CreateEnderecoEstabelecimentoDto;

  @ApiProperty()
  @IsNumber({}, { message: 'O whatsapp deve conter apenas números' })
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instagram: string;

  @ApiProperty()
  @IsBase64({ message: 'A foto de perfil deve ser convertida para Base64' })
  @IsNotEmpty()
  fotoPerfil: string;

  @ApiProperty()
  @IsBase64({ message: 'A foto de capa deve ser convertida para Base64' })
  @IsNotEmpty()
  fotoCapa: string;

  @ApiProperty({ required: false, default: true })
  status: boolean;
}
