import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EstabelecimentoModalidadeCategoria } from './estabelecimento-modalidade-categoria.entity';

@Entity('Categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'text' })
  icone: string;

  @OneToMany(
    () => EstabelecimentoModalidadeCategoria,
    (estabelecimentoModalidadeCategoria) =>
      estabelecimentoModalidadeCategoria.categoria,
  )
  estabelecimentoModalidadeCategorias: EstabelecimentoModalidadeCategoria[];
}
