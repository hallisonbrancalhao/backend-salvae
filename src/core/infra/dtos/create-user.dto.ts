import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateEnderecoDto } from './create-endereco.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString({ message: 'O sobrenome deve ser uma string' })
  @IsNotEmpty()
  sobrenome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'A senha deve ser uma string' })
  senha: string;

  @ApiProperty()
  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty()
  CPF: string;

  @ApiProperty({ type: CreateEnderecoDto, required: false })
  @IsOptional()
  endereco: CreateEnderecoDto;

  @ApiProperty()
  @IsString({ message: 'A data deve ser no formato dd/mm/yyyy' })
  @IsNotEmpty()
  dataNascimento: string;

  @ApiProperty()
  @IsString({ message: 'O telefone deve conter apenas números' })
  @IsNotEmpty()
  telefone: string;
}
