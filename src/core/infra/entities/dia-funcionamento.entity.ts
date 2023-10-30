import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PromocaoDia } from './promocao-dia.entity';

@Entity('DiaFuncionamento')
export class DiaFuncionamento {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PromocaoDia, (promocaoDia) => promocaoDia.dia)
  diaFuncionamento: PromocaoDia[];

  @Column({ type: 'int' })
  dia: string;
}
