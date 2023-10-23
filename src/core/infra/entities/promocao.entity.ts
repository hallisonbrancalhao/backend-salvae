import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EstabelecimentoModalidade } from './estabelecimento-modalidade.entity';
import { PromocaoValidade } from './promocao-validade.entity';

@Entity('Promocao')
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => EstabelecimentoModalidade,
    (estabelecimentoModalidade) => estabelecimentoModalidade.promocao,
  )
  @JoinColumn({ name: 'idEstabelecimentoModalidade' })
  estabelecimentoModalidade: EstabelecimentoModalidade;

  @Column({ type: 'varchar' })
  descricao: string;

  @OneToMany(
    () => PromocaoValidade,
    (promocaoValidade) => promocaoValidade.promocao,
  )
  promocaoValidades: PromocaoValidade[];
}
