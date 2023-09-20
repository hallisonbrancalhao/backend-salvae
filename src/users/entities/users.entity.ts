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
  IsDate,
} from '@nestjs/class-validator';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  sobrenome: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  senha: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  CPF: number;

  @OneToOne(() => Endereco)
  @JoinColumn()
  endereco: Endereco;

  @Column()
  @IsDate()
  @IsNotEmpty()
  dataNascimento: Date;

  @Column()
  @IsNumber()
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
