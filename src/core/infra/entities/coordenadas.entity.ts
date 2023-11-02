import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { IsString } from '@nestjs/class-validator';

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

  @OneToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.coordenadas,
    { onDelete: 'CASCADE' },
  )
  estabelecimento: Estabelecimento;
}
