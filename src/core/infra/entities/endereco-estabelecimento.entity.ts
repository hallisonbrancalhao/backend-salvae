import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { Estabelecimento } from './estabelecimento.entity';

@Entity({ name: 'EnderecoEstabelecimento' })
export class EnderecoEstabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.endereco,
  )
  estabelecimento: Estabelecimento;

  @Column()
  @IsString({ message: 'O CEP deve ser string' })
  @IsNotEmpty({ message: 'O CEP deve ser preenchido' })
  @MinLength(8, { message: 'O CEP deve conter 8 dígitos' })
  @MaxLength(8, { message: 'O CEP deve conter 8 dígitos' })
  cep: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  complemento: string | null;

  @Column()
  @IsString({ message: 'O número deve ser uma string' })
  @IsNotEmpty({ message: 'O número deve ser preenchido' })
  numero: string;

  @Column()
  @IsOptional({ message: 'O estado deve ser preenchido' })
  @IsString({ message: 'O estado deve ser uma string' })
  logradouro: string;

  @Column()
  @IsString({ message: 'O bairro deve ser uma string' })
  @IsNotEmpty({ message: 'O bairro deve ser preenchido' })
  bairro: string;

  @Column()
  @IsString({ message: 'A cidade deve ser uma string' })
  @IsNotEmpty({ message: 'A cidade deve ser preenchida' })
  cidade: string;

  @Column()
  @IsString({ message: 'O estado deve ser uma string' })
  @IsNotEmpty({ message: 'O estado deve ser preenchido' })
  estado: string;

  @Column()
  @IsString({ message: 'O país deve ser uma string' })
  @IsNotEmpty({ message: 'O país deve ser preenchido' })
  pais: string;
}
