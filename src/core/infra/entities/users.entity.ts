import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from '@nestjs/class-validator';
import { Endereco } from './endereco.entity';

@Entity({ name: 'Usuario' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty()
  nome: string;

  @Column()
  @IsString({ message: 'O sobrenome deve ser uma string' })
  @IsNotEmpty()
  sobrenome: string;

  @Column()
  @IsEmail({}, { message: 'O email deve ser um email válido' })
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty()
  senha: string;

  @Column({ type: 'bigint' })
  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty()
  CPF: string;

  @OneToOne(() => Endereco, (endereco) => endereco.user)
  @IsOptional()
  @JoinColumn({ name: 'enderecoId' })
  endereco: Endereco;

  @Column()
  @IsString({ message: 'A data deve ser no formato dd/mm/yyyy' })
  @IsNotEmpty()
  dataNascimento: string;

  @Column({ type: 'bigint' })
  @IsNumber({}, { message: 'O telefone deve conter apenas números' })
  @IsNotEmpty()
  telefone: number;

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