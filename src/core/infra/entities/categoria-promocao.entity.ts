import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PromocaoCategoriaPromocao } from './promocao-categoria-promo.entity';

@Entity('CategoriaPromocao')
export class CategoriaPromocao {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => PromocaoCategoriaPromocao,
    (promocaoCategoria) => promocaoCategoria.categoriaPromocao,
  )
  promocaoCategoria: PromocaoCategoriaPromocao[];

  @Column({ type: 'varchar' })
  nome: string;
}
