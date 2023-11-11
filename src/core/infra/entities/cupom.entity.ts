import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promocao } from './promocao.entity';
import { User } from './users.entity';
import { StatusCupom } from 'src/core/enum/status-cupom.enum';

@Entity('Cupom')
export class Cupom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: StatusCupom.ATIVO })
  status: string;

  @Column({ type: 'date' })
  dataValidade: Date;

  @ManyToOne(() => Promocao, (promocao) => promocao.cupom)
  promocao: Promocao;

  @ManyToOne(() => User, (user) => user.cupom)
  user: User;

  @Column({ type: 'varchar' })
  codigo: string;
}
