import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Mapa } from './mapa.entity';

@Entity({ name: 'Coordenadas' })
export class Coordenadas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsString({ message: 'A longitude deve ser uma string' })
  @IsNotEmpty({ message: 'A latitude deve ser preenchida' })
  latitude: string;

  @Column({ type: 'varchar' })
  @IsString({ message: 'A longitude deve ser uma string' })
  @IsNotEmpty({ message: 'A longitude deve ser preenchida' })
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
  @JoinColumn({ name: 'estabelecimento_id' })
  estabelecimento: Estabelecimento;
}
