import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstabelecimentoModalidade } from './estabelecimento-modalidade.entity';
import { Promocao } from './promocao.entity';

@Entity('Modalidade')
export class Modalidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EstabelecimentoModalidade, (promocao) => promocao.promocao)
  @JoinColumn({ name: 'idPromocao' })
  promocao: Promocao;

  @Column({ type: 'varchar' })
  nome: string;

  @OneToMany(
    () => EstabelecimentoModalidade,
    (estabelecimentoModalidade) => estabelecimentoModalidade.modalidade,
  )
  estabelecimentoModalidades: EstabelecimentoModalidade[];
}
