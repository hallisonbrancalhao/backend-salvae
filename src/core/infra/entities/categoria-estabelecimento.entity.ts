import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstabelecimentoCategoriaEstabelecimento } from './estabelecimento-categoria-est.entity';

@Entity('CategoriaEstabelecimento')
export class CategoriaEstabelecimento {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => EstabelecimentoCategoriaEstabelecimento,
    (estabelecientoCategoria) =>
      estabelecientoCategoria.categoriaEstabelecimento,
  )
  estabelecimentoCategoria: EstabelecimentoCategoriaEstabelecimento[];

  @Column()
  nome: string;

  @Column({ type: 'image' })
  icone: File;
}
