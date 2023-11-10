import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promocao } from './promocao.entity';
import { User } from './users.entity';

@Entity('Cupom')
export class Cupom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  codigo: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'date' })
  dataValidade: Date;

  @ManyToOne(() => Promocao, (promocao) => promocao.cupom)
  promocao: Promocao;

  @ManyToOne(() => User, (user) => user.cupom)
  user: User;
}
