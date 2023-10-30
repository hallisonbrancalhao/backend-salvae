import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { CategoriaEstabelecimento } from './categoria-estabelecimento.entity';

@Entity('EstabelecimentoCategoriaEstabelecimento')
export class EstabelecimentoCategoriaEstabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Estabelecimento,
    (Estabelecimento) => Estabelecimento.estabelecimentoCategoria,
  )
  @JoinColumn({ name: 'idEstabelecimento' })
  estabelecimento: Estabelecimento;

  @ManyToOne(
    () => CategoriaEstabelecimento,
    (categoria) => categoria.estabelecimentoCategoria,
  )
  @JoinColumn({ name: 'idCategoriaEstabelecimento' })
  categoriaEstabelecimento: CategoriaEstabelecimento;
}
