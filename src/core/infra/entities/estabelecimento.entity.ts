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
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { EnderecoEstabelecimento } from './endereco-estabelecimento.entity';
import { Coordenadas } from './coordenadas.entity';
import { Promocao } from './promocao.entity';
import { Avaliacao } from './avaliacao.entity';
import { CategoriaEstabelecimento } from './categoria-estabelecimento.entity';

@Entity('Estabelecimento')
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => EnderecoEstabelecimento,
    (endereco) => endereco.estabelecimento,
    { cascade: true },
  )
  @JoinColumn()
  endereco: EnderecoEstabelecimento;

  @OneToOne(() => Coordenadas, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  coordenadas: Coordenadas;

  @OneToMany(() => Promocao, (promocao) => promocao.estabelecimento, {
    cascade: true,
  })
  promocao: Promocao[];

  @ManyToOne(
    () => CategoriaEstabelecimento,
    (categoriaEstabelecimento) => categoriaEstabelecimento.estabelecimento,
  )
  @JoinColumn()
  estabelecimentoCategoria: CategoriaEstabelecimento;

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.estabelecimento, {
    cascade: true,
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

  @Column({ type: 'longtext' })
  @IsString({ message: 'A foto deve ser do tipo Base64' })
  @IsNotEmpty()
  fotoPerfil: string;

  @Column({ type: 'longtext' })
  @IsString({ message: 'A foto deve ser do tipo Base64' })
  @IsNotEmpty()
  fotoCapa: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  /*
   * 1 - Admin
   * 2 - Estabelecimento
   */
  @Column({ type: 'integer', default: 2 })
  role: number;

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
