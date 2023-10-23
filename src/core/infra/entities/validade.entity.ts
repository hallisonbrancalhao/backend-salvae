import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PromocaoValidade } from './promocao-validade.entity';

@Entity('Validade')
export class Validade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  dia: number[];

  @OneToMany(
    () => PromocaoValidade,
    (promocaoValidade) => promocaoValidade.validade,
  )
  promocaoValidades: PromocaoValidade[];
}
