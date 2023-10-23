import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Promocao } from './promocao.entity';
import { Validade } from './validade.entity';

@Entity('PromocaoValidade')
export class PromocaoValidade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Promocao, (promocao) => promocao.promocaoValidades)
  @JoinColumn({ name: 'idPromocao' })
  promocao: Promocao;

  @ManyToOne(() => Validade, (validade) => validade.promocaoValidades)
  @JoinColumn({ name: 'idValidade' })
  validade: Validade;
}
