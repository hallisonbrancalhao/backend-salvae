import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { IsString } from '@nestjs/class-validator';
import { Mapa } from './mapa.entity';

@Entity({ name: 'Coordenadas' })
export class Coordenadas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsString({ message: 'A longitude deve ser uma string' })
  latitude: string;

  @Column({ type: 'varchar' })
  @IsString({ message: 'A longitude deve ser uma string' })
  longitude: string;

  @ManyToOne(() => Mapa, (mapa) => mapa.coordenadas, {
    onDelete: 'CASCADE',
  })
  mapa: Mapa;

  @OneToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.coordenadas,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'estabelecimentoId' })
  estabelecimento: Estabelecimento;
}
