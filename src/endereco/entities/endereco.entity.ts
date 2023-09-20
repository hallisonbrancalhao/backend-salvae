import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cep: string;

  @Column()
  @IsOptional()
  @IsString()
  complemento: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  numero: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  rua: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @Column()
  @IsOptional()
  @IsString()
  logradouro: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  estado: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  pais: string;

  @Column()
  @IsOptional()
  @IsString()
  coordenadas: string;
}
