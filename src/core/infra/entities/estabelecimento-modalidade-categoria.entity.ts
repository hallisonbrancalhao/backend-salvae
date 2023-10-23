import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EstabelecimentoModalidade } from './estabelecimento-modalidade.entity';
import { Categoria } from './categoria.entity';

@Entity('EstabelecimentoModalidadeCategoria')
export class EstabelecimentoModalidadeCategoria {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EstabelecimentoModalidade)
  @JoinColumn({ name: 'idEstabelecimentoModalidade' })
  estabelecimentoModalidade: EstabelecimentoModalidade;

  @ManyToOne(
    () => Categoria,
    (categoria) => categoria.estabelecimentoModalidadeCategorias,
  )
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;
}
