import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';

@Entity('Avaliacao')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Estabelecimento,
    (Estabelecimento) => Estabelecimento.avaliacao,
  )
  @JoinColumn()
  estabelecimento: Estabelecimento;

  @Column({ type: 'int' })
  estrelas: number;

  @Column({ type: 'bool' })
  primeiraVez: boolean;
}
