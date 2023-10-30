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
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { EnderecoEstabelecimento } from './endereco-estabelecimento.entity';
import { Coordenadas } from './coordenadas.entity';
import { Promocao } from './promocao.entity';
import { EstabelecimentoCategoriaEstabelecimento } from './estabelecimento-categoria-est.entity';
import { Avaliacao } from './avaliacao.entity';

@Entity('Estabelecimento')
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => EnderecoEstabelecimento, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  endereco: EnderecoEstabelecimento;

  @OneToOne(() => Coordenadas, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  coordenadas: Coordenadas;

  @OneToMany(() => Promocao, (promocao) => promocao.estabelecimento, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  promocao: Promocao[];

  @OneToMany(
    () => EstabelecimentoCategoriaEstabelecimento,
    (estabelecimentoCategoria) => estabelecimentoCategoria.estabelecimento,
  )
  estabelecimentoCategoria: EstabelecimentoCategoriaEstabelecimento[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.estabelecimento, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  avaliacao: Avaliacao[];

  @Column()
  @IsString({ message: 'O cnpj deve ser uma string' })
  @IsNotEmpty()
  @Unique(['cnpj'])
  cnpj: string;

  @Column()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty()
  nome: string;

  @Column()
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty()
  senha: string;

  @Column({ type: 'varchar' })
  @IsString({ message: 'O whatsapp deve conter apenas números' })
  @IsNotEmpty()
  whatsapp: string;

  @Column({ type: 'varchar' })
  @IsString({ message: 'O instagram deve ser uma string válida' })
  @IsNotEmpty()
  instagram: string;

  @Column({ type: 'image' })
  @IsString({ message: 'A foto deve ser do tipo Image' })
  @IsNotEmpty()
  fotoPerfil: File;

  @Column({ type: 'image' })
  @IsString({ message: 'A foto deve ser do tipo Image' })
  @IsNotEmpty()
  fotoCapa: File;

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
