import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promocao } from './promocao.entity';
import { CategoriaPromocao } from './categoria-promocao.entity';

@Entity('PromocaoCategoriaPromocao')
export class PromocaoCategoriaPromocao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Promocao, (promocao) => promocao.promocaoCategoria, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPromocao' })
  promocao: Promocao;

  @ManyToOne(() => CategoriaPromocao)
  @JoinColumn({ name: 'idCategoriaPromocao' })
  categoriaPromocao: CategoriaPromocao;
}
