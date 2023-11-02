import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';

@Entity('CategoriaEstabelecimento')
export class CategoriaEstabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => Estabelecimento,
    (categoria) => categoria.estabelecimentoCategoria,
  )
  estabelecimento: Estabelecimento[];

  @Column()
  nome: string;

  @Column({ type: 'longtext' })
  icone: string;
}
