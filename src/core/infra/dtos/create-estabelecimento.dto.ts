import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from '@nestjs/class-validator';
import { CreateEnderecoEstabelecimentoDto } from './create-endereco-estabelecimento.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UploadImageDto } from './upload-image.dto';
import { File } from 'buffer';

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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  estabelecimentoCategoria: string;

  @ApiProperty()
  @IsString({ message: 'O whatsapp deve ser válido' })
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  instagram: string;

  @ApiProperty({ type: File })
  fotoPerfil: UploadImageDto;

  @ApiProperty({ type: File })
  fotoCapa: UploadImageDto;

  @ApiProperty({ required: false, default: true })
  status: boolean;

  @ApiProperty({ example: '12345678' })
  @IsString({ message: 'O CEP deve ser um número' })
  @IsNotEmpty({ message: 'O CEP deve ser preenchido' })
  cep: string;

  @ApiProperty()
  @IsOptional()
  complemento: string | null;

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

  @ApiProperty({ example: 1 })
  @IsOptional()
  role: number | null;
}
