import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promocao } from './promocao.entity';
import { DiaFuncionamento } from './dia-funcionamento.entity';

@Entity('PromocaoDia')
export class PromocaoDia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Promocao, (promocao) => promocao.promocaoDia, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idPromocao' })
  promocao: Promocao;

  @ManyToOne(() => DiaFuncionamento)
  @JoinColumn({ name: 'idDiaFuncionamento' })
  dia: DiaFuncionamento;
}
