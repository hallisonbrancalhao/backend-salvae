import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Endereco } from './endereco.entity';
import { Cupom } from './cupom.entity';

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
  @Unique(['email'])
  email: string;

  @Column()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty()
  senha: string;

  @Column()
  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty()
  @Unique(['CPF'])
  CPF: string;

  @OneToOne(() => Endereco, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  endereco: Endereco;

  @ManyToOne(() => Cupom, (cupom) => cupom.user)
  cupom: Cupom[];

  @Column()
  @IsString({ message: 'A data deve ser no formato dd/mm/yyyy' })
  @IsNotEmpty()
  dataNascimento: string;

  @Column()
  @IsString({ message: 'O telefone deve ser válido' })
  @IsNotEmpty()
  telefone: string;

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
