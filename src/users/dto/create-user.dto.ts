import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { CreateEnderecoDto } from 'src/endereco/dto/create-endereco.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  sobrenome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  senha: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  CPF: number;

  @ApiProperty()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  dataNascimento: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  telefone: number;
}
