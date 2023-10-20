import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from '@nestjs/class-validator';
import { EnderecoEstabelecimento } from './endereco-estabelecimento.entity';
import { Coordenadas } from './coordenadas.entity';

@Entity('Estabelecimento')
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'O cnpj deve ser uma string' })
  @IsNotEmpty()
  cnpj: string;

  @Column()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty()
  nome: string;

  @Column()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty()
  senha: string;

  @OneToOne(
    () => EnderecoEstabelecimento,
    (endereco) => endereco.estabelecimento,
    {
      cascade: true,
      eager: true,
    },
  )
  @IsOptional()
  endereco: EnderecoEstabelecimento;

  @OneToOne(() => Coordenadas, (coordenadas) => coordenadas.estabelecimento, {
    cascade: true,
    eager: true,
  })
  coordenadas: Coordenadas;

  @Column({ type: 'varchar' })
  @IsNumber({}, { message: 'O whatsapp deve conter apenas números' })
  @IsNotEmpty()
  whatsapp: string;

  @Column({ type: 'varchar' })
  @IsNumber({}, { message: 'O whatsapp deve conter apenas números' })
  @IsNotEmpty()
  instagram: string;

  //TODO validar tamanho
  @Column({ type: 'text' })
  @IsString({ message: 'A foto deve ser convertida Base64' })
  @IsNotEmpty()
  fotoPerfil: string;

  //TODO validar tamanho
  @Column({ type: 'text' })
  @IsString({ message: 'A foto deve ser convertida Base64' })
  @IsNotEmpty()
  fotoCapa: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
