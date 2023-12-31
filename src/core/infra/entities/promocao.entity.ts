import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { PromocaoCategoriaPromocao } from './promocao-categoria-promo.entity';
import { PromocaoDia } from './promocao-dia.entity';
import { Cupom } from './cupom.entity';

@Entity('Promocao')
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Estabelecimento,
    (Estabelecimento) => Estabelecimento.promocao,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  estabelecimento: Estabelecimento;

  @OneToMany(
    () => PromocaoCategoriaPromocao,
    (promocaoCategoria) => promocaoCategoria.promocao,
    { cascade: true },
  )
  promocaoCategoria: PromocaoCategoriaPromocao[];

  @OneToMany(() => PromocaoDia, (promocaoDia) => promocaoDia.promocao)
  promocaoDia: PromocaoDia[];

  @Column({ type: 'varchar' })
  descricao: string;

  @OneToMany(() => Cupom, (cupom) => cupom.promocao)
  cupom: Cupom[];

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
