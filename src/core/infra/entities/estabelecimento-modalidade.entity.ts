import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { Modalidade } from './modalidade.entity';
import { Promocao } from './promocao.entity';
import { EstabelecimentoModalidadeCategoria } from './estabelecimento-modalidade-categoria.entity';

@Entity('EstabelecimentoModalidade')
export class EstabelecimentoModalidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.modalidade,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'idEstabelecimento' })
  estabelecimento: Estabelecimento;

  @ManyToOne(
    () => Modalidade,
    (modalidade) => modalidade.estabelecimentoModalidades,
  )
  @JoinColumn({ name: 'idModalidade' })
  modalidade: Modalidade;

  @ManyToOne(() => EstabelecimentoModalidadeCategoria)
  @JoinColumn({ name: 'idModalidadeCategoria' })
  modalidadeCategoria: EstabelecimentoModalidadeCategoria;

  @OneToMany(() => Promocao, (promocao) => promocao.estabelecimentoModalidade)
  promocao: Promocao[];
}
